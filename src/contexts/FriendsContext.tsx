import { ReactNode, createContext, useContext, useState } from 'react'
import { UserDTO } from '../dtos/userDTO'

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
  const [friends, setFriends] = useState<UserDTO[]>([])

  const onSetFriends = (newFriends: UserDTO[]) => {
    setFriends(newFriends)
  }

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
