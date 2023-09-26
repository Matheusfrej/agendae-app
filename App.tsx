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

export default function App() {
  const [fontsLoaded] = useFonts({ Overpass_400Regular, Overpass_700Bold })

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Routes /> : <ActivityIndicator />}
    </ThemeProvider>
  )
}
