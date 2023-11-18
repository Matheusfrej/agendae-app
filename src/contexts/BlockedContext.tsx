import { ReactNode, createContext, useContext, useState } from 'react'
import { UserDTO } from '../dtos/userDTO'

interface BlockedContextProviderProps {
  children: ReactNode
}

interface BlockedContextType {
  blocked: UserDTO[]
  onSetBlocked: (newBlocked: UserDTO[]) => void
}

export const BlockedContext = createContext({} as BlockedContextType)

export function BlockedContextProvider({
  children,
}: BlockedContextProviderProps) {
  const [blocked, setBlocked] = useState<UserDTO[]>([])

  const onSetBlocked = (newBlocked: UserDTO[]) => {
    setBlocked(newBlocked)
  }

  return (
    <BlockedContext.Provider
      value={{
        blocked,
        onSetBlocked,
      }}
    >
      {children}
    </BlockedContext.Provider>
  )
}

export function useBlocked(): BlockedContextType {
  return useContext(BlockedContext)
}
