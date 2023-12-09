import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from '../dtos/userDTO'
import { useAuth } from './AuthContext'
import { AppError } from '@utils/AppError'
import api from '../libs/api'

interface FriendsContextProviderProps {
  children: ReactNode
}

interface FriendsContextType {
  friends: UserDTO[]
  onSetFriends: (newFriends: UserDTO[]) => void
}

export const FriendsContext = createContext({} as FriendsContextType)

export function FriendsContextProvider({
  children,
}: FriendsContextProviderProps) {
  const { isLogged, setSnackbarStatus } = useAuth()

  const [friends, setFriends] = useState<UserDTO[]>([])

  const onSetFriends = (newFriends: UserDTO[]) => {
    setFriends(newFriends)
  }

  const fetchFriends = async () => {
    try {
      const response = await api.get('/friends')

      onSetFriends(response.data.friends)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os seus amigos. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
    }
  }

  useEffect(() => {
    if (!isLogged) {
      setFriends([])
    } else {
      if (friends.length === 0) fetchFriends()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  return (
    <FriendsContext.Provider
      value={{
        friends,
        onSetFriends,
      }}
    >
      {children}
    </FriendsContext.Provider>
  )
}

export function useFriends(): FriendsContextType {
  return useContext(FriendsContext)
}
