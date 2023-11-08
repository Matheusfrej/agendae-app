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
import { SnackBar, setSnackBarType } from 'react-native-simple-snackbar'
import { useTheme } from 'styled-components'
import { AppError } from '@utils/AppError'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: any
  isLogged: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  setSnackbarStatus: (text: string, isSuccess: boolean) => void
  userUpdate: (user: any) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [status, setStatus] = useState<setSnackBarType | undefined>()
  const [user, setUser] = useState<any>()
  const theme = useTheme()
  const isLogged = user !== undefined

  async function userUpdate(user: any) {
    setUser(user)
    await storageUserSave(user)
  }

  async function userAndTokenUpdate(user: any, token: string) {
    api.defaults.headers.common.Authorization = token

    setUser(user)
  }

  const setSnackbarStatus = (text: string, isSuccess: boolean) => {
    setStatus({
      content: text,
      backgroundColor: isSuccess ? theme.COLORS.BLUE : theme.COLORS.RED,
      color: theme.COLORS.WHITE,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      position: 'bottom',
    })
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
        setSnackbarStatus,
        userUpdate,
      }}
    >
      {children}
      <SnackBar setSnackBar={status} />
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
