import { ActivityIndicator } from 'react-native'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Overpass_400Regular,
  Overpass_700Bold,
} from '@expo-google-fonts/overpass'

import theme from './src/theme'

import { HomeList } from '@screens/HomeList'

export default function App() {
  const [fontsLoaded] = useFonts({ Overpass_400Regular, Overpass_700Bold })

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <HomeList /> : <ActivityIndicator />}
    </ThemeProvider>
  )
}
