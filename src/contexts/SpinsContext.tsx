import { AppError } from '@utils/AppError'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '../libs/api'
import { useAuth } from './AuthContext'
import { SpinDTO } from '../dtos/spinDTO'

interface SpinsContextProviderProps {
  children: ReactNode
}

interface SpinsContextType {
  spins: SpinDTO[] | undefined
  spinsUpdate: (spins: SpinDTO[]) => Promise<void>
}

export const SpinsContext = createContext({} as SpinsContextType)

export function SpinsContextProvider({ children }: SpinsContextProviderProps) {
  const { setSnackbarStatus, isLogged } = useAuth()

  const [spins, setSpins] = useState<SpinDTO[] | undefined>()

  async function spinsUpdate(spins: SpinDTO[]) {
    setSpins(spins)
  }

  async function getSpins() {
    try {
      const { data } = await api.get('/spins')

      setSpins(data.spins)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível obter os seus rolês. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
    }
  }

  useEffect(() => {
    if (!spins && isLogged) getSpins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  return (
    <SpinsContext.Provider
      value={{
        spins,
        spinsUpdate,
      }}
    >
      {children}
    </SpinsContext.Provider>
  )
}

export function useSpins(): SpinsContextType {
  return useContext(SpinsContext)
}
