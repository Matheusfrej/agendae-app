import { ReactNode, createContext, useContext, useState } from 'react'
import { SnackBar, setSnackBarType } from 'react-native-simple-snackbar'
import { useTheme } from 'styled-components'

interface SnackbarContextProviderProps {
  children: ReactNode
}

interface SnackbarContextType {
  setSnackbarStatus: (text: string, isSuccess: boolean) => void
}

export const SnackbarContext = createContext({} as SnackbarContextType)

export function SnackbarContextProvider({
  children,
}: SnackbarContextProviderProps) {
  const [status, setStatus] = useState<setSnackBarType | undefined>()
  const theme = useTheme()

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

  return (
    <SnackbarContext.Provider
      value={{
        setSnackbarStatus,
      }}
    >
      {children}
      <SnackBar setSnackBar={status} />
    </SnackbarContext.Provider>
  )
}

export function useSnackbar(): SnackbarContextType {
  return useContext(SnackbarContext)
}
