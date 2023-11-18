import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from '../dtos/userDTO'
import { useAuth } from './AuthContext'

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
  const { isLogged } = useAuth()

  const [blocked, setBlocked] = useState<UserDTO[]>([])

  const onSetBlocked = (newBlocked: UserDTO[]) => {
    setBlocked(newBlocked)
  }

  useEffect(() => {
    if (!isLogged) {
      setBlocked([])
    }
  }, [isLogged])

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
