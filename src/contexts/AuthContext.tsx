import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '../libs/api'
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import { storageUserSave } from '@storage/storageUser'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: any
  userStatistics: any
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<any>()
  const [userStatistics, setUserStatistics] = useState<any>()

  async function storageUserAndToken(user: any, token: string) {
    api.defaults.headers.common.Authorization = token

    await storageUserSave(user)
    await storageAuthTokenSave(token)
  }

  async function getProfile(user_id: any) {
    try {
      const profile_response = await api.get(`/users/${user_id}`)
      setUserStatistics(profile_response.data.statistics)
      console.log(profile_response.data.statistics)
    } catch (error) {}
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/users/login', { email, password })

      if (data.user && data.token) {
        setUser(user)
        storageUserAndToken(data.user, data.token)
        console.log(data.user)
        getProfile(data.user.id)
      }
    } catch (error) {}
  }

  useEffect(() => {
    signIn('matheusfrej@gmail.com', '123456')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        userStatistics,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
