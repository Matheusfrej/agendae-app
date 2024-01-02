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

// Contexts
import { AuthContextProvider } from './src/contexts/AuthContext'
import { SpinsContextProvider } from './src/contexts/SpinsContext'
import { FriendsContextProvider } from './src/contexts/FriendsContext'
import { BlockedContextProvider } from './src/contexts/BlockedContext'
import { NotificationsContextProvider } from './src/contexts/NotificationsContext'
import { SnackbarContextProvider } from './src/contexts/SnackbarContext'

// Random
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({ Overpass_400Regular, Overpass_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <AuthContextProvider>
          <SpinsContextProvider>
            <FriendsContextProvider>
              <BlockedContextProvider>
                <NotificationsContextProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    {fontsLoaded ? (
                      <>
                        <Routes />
                        <StatusBar />
                      </>
                    ) : (
                      <Loading />
                    )}
                  </GestureHandlerRootView>
                </NotificationsContextProvider>
              </BlockedContextProvider>
            </FriendsContextProvider>
          </SpinsContextProvider>
        </AuthContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
