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

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: any
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<any>()

  async function userAndTokenUpdate(user: any, token: string) {
    api.defaults.headers.common.Authorization = token

    setUser(user)
  }

  async function storageUserAndTokenSave(
    user: any,
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
      }
    } catch (error) {}
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
    signIn('matheusfrej@gmail.com', '123456')
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
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
