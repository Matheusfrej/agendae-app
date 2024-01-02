import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '../libs/api'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import { AppError } from '@utils/AppError'
import { UserDTO } from '../dtos/userDTO'
import { useSnackbar } from './SnackbarContext'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: UserDTO | undefined
  isLogged: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  userUpdate: (user: UserDTO) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { setSnackbarStatus } = useSnackbar()
  const [user, setUser] = useState<UserDTO | undefined>()
  const isLogged = user !== undefined

  async function userUpdate(user: UserDTO) {
    setUser(user)
    await storageUserSave(user)
  }

  async function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = token

    setUser(user)
  }

  async function storageUserAndTokenSave(
    user: UserDTO,
    token: string,
    refreshToken: string,
  ) {
    await storageUserSave(user)
    await storageAuthTokenSave(token, refreshToken)
  }

  async function signIn(email: string, password: string) {
    try {
      const { data, headers } = await api.post('/users/login', {
        email,
        password,
      })

      const refreshToken = headers['set-cookie']?.[0]
        .split('; ')[0]
        .split('refreshToken=')[1]

      if (data.user && data.token && refreshToken) {
        setUser(user)
        storageUserAndTokenSave(data.user, data.token, refreshToken)
        userAndTokenUpdate(data.user, data.token)
        setSnackbarStatus('Logado com sucesso!', true)
        return true
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
    return false
  }

  async function signOut() {
    setUser(undefined)
    await storageUserRemove()
    await storageAuthTokenRemove()
  }

  async function loadUserData() {
    const userLogged = await storageUserGet()
    const { token } = await storageAuthTokenGet()

    if (token && userLogged) {
      userAndTokenUpdate(userLogged, token)
    }
  }

  useEffect(() => {
    loadUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        signIn,
        signOut,
        userUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
