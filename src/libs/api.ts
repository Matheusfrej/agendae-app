import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import { AppError } from '@utils/AppError'
import axios, { AxiosInstance, AxiosError } from 'axios'

type SignOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

// const api = axios.create({
//   baseURL: 'http://18.221.61.128:3000/',
// }) as APIInstanceProps

const api = axios.create({
  baseURL: 'http://192.168.0.13:3000/',
}) as APIInstanceProps

let failedQueue: PromiseType[] = []
let isRefreshing = false

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (requestError.response.data.message === 'Não autorizado.') {
          const { refreshToken } = await storageAuthTokenGet()

          if (!refreshToken) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = { Authorization: token }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const { data, headers } = await api.patch(
                '/token/refresh',
                {},
                { headers: { Cookie: `refreshToken=${refreshToken}` } },
              )

              const newRefreshToken = headers['set-cookie']?.[0]
                .split('; ')[0]
                .split('refreshToken=')[1]

              if (data.token && newRefreshToken) {
                await storageAuthTokenSave(data.token, newRefreshToken)

                if (originalRequestConfig.data) {
                  originalRequestConfig.data = JSON.parse(
                    originalRequestConfig.data,
                  )
                }

                originalRequestConfig.headers = { Authorization: data.token }
                api.defaults.headers.common.Authorization = data.token

                failedQueue.forEach((request) => {
                  request.onSuccess(data.token)
                })

                // console.log('TOKEN ATUALIZADO!')

                resolve(api(originalRequestConfig))
              }
            } catch (error: unknown) {
              console.log(error)

              const err = error as AxiosError
              if (err instanceof AxiosError) {
                failedQueue.forEach((request) => {
                  request.onFailure(err)
                })
              }

              signOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }

        signOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      }
      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export default api
