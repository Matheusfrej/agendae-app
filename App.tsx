import { ActivityIndicator } from 'react-native'

// Themes
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Overpass_400Regular,
  Overpass_700Bold,
} from '@expo-google-fonts/overpass'
import theme from './src/theme'

// Routes
import { Routes } from '@routes/index'
import { AuthContextProvider } from './src/contexts/AuthContext'
import { SpinsContextProvider } from './src/contexts/SpinsContext'
import { FriendsContextProvider } from './src/contexts/FriendsContext'

export default function App() {
  const [fontsLoaded] = useFonts({ Overpass_400Regular, Overpass_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <SpinsContextProvider>
          <FriendsContextProvider>
            {fontsLoaded ? <Routes /> : <ActivityIndicator />}
          </FriendsContextProvider>
        </SpinsContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}
