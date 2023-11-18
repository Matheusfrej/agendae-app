import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from '../dtos/userDTO'
import { useAuth } from './AuthContext'

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
  const { isLogged } = useAuth()

  const [friends, setFriends] = useState<UserDTO[]>([])

  const onSetFriends = (newFriends: UserDTO[]) => {
    setFriends(newFriends)
  }

  useEffect(() => {
    if (!isLogged) {
      setFriends([])
    }
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
