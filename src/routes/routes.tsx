import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeList } from '@screens/HomeList'
import { HomeCalendar } from '@screens/HomeCalendar'
import { Profile } from '@screens/Profile'
import { useTheme } from 'styled-components'

import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { Text } from 'react-native'
import { SpinsOfDay } from '@screens/SpinsOfDay'
import { CreateUpdateSpin } from '@screens/CreateUpdateSpin'
import { Notifications } from '@screens/Notifications'
import { Spin } from '@screens/Spin'
import { Login } from '@screens/Login'
import { Register } from '@screens/Register'
import { AddFriend } from '@screens/AddFriend'
import { Blocked } from '@screens/Blocked'
import { EditProfile } from '@screens/EditProfile'
import { Friends } from '@screens/Friends'
import { Report } from '@screens/Report'

const Tab = createBottomTabNavigator()
const { Screen, Navigator } = createNativeStackNavigator()

function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Register"
        component={Register}
        options={{ animation: 'fade_from_bottom' }}
      />

      <Screen
        name="Login"
        component={Login}
        options={{ animation: 'fade_from_bottom' }}
      />
    </Navigator>
  )
}

function HomeListStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HomeList" component={HomeList} />
      <Screen
        name="CreateUpdateSpin"
        component={CreateUpdateSpin}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Screen
        name="Notifications"
        component={Notifications}
        options={{ animation: 'fade' }}
      />

      <Screen
        name="Spin"
        component={Spin}
        options={{ animation: 'fade_from_bottom' }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Screen name="OtherProfile" component={Profile} />
    </Navigator>
  )
}

function HomeCalendarStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HomeCalendar" component={HomeCalendar} />
      <Screen
        name="SpinsOfDay"
        component={SpinsOfDay}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Screen
        name="CreateUpdateSpin"
        component={CreateUpdateSpin}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Screen
        name="Notifications"
        component={Notifications}
        options={{ animation: 'fade' }}
      />

      <Screen
        name="Spin"
        component={Spin}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Screen name="OtherProfile" component={Profile} />
    </Navigator>
  )
}

function ProfileStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen name="OtherProfile" component={Profile} />

      <Screen
        name="Report"
        component={Report}
        options={{ animation: 'fade_from_bottom' }}
      />

      <Screen
        name="Friends"
        component={Friends}
        options={{ animation: 'fade' }}
      />

      <Screen
        name="EditProfile"
        component={EditProfile}
        options={{ animation: 'fade_from_bottom' }}
      />

      <Screen
        name="Blocked"
        component={Blocked}
        options={{ animation: 'fade_from_bottom' }}
      />

      <Screen
        name="AddFriend"
        component={AddFriend}
        options={{ animation: 'fade_from_bottom' }}
      />
    </Navigator>
  )
}

export function TabRoutes() {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: theme.COLORS.GRAY_300,
          borderTopWidth: 1,
          height: 72,
          justifyContent: 'center',
          paddingBottom: 8,
        },

        tabBarActiveTintColor: theme.COLORS.PURPLE_700,
        tabBarInactiveTintColor: theme.COLORS.BLACK,
      }}
    >
      <Tab.Screen
        name="HomeListStack"
        component={HomeListStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <FontAwesome5
                  name="list"
                  size={24}
                  color={theme.COLORS.PURPLE_700}
                />
              )
            }

            return (
              <FontAwesome5 name="list" size={24} color={theme.COLORS.BLACK} />
            )
          },
          tabBarLabel: ({ color, focused }) => {
            if (focused) {
              return (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color,
                    fontSize: 16,
                    marginTop: -10,
                  }}
                >
                  lista
                </Text>
              )
            }
            return (
              <Text style={{ color, fontSize: 16, marginTop: -10 }}>lista</Text>
            )
          },
        }}
      />
      <Tab.Screen
        name="HomeCalendarStack"
        component={HomeCalendarStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <MaterialCommunityIcons
                  name="calendar"
                  size={28}
                  color={theme.COLORS.PURPLE_700}
                />
              )
            }

            return (
              <MaterialCommunityIcons
                name="calendar"
                size={28}
                color={theme.COLORS.BLACK}
              />
            )
          },
          tabBarLabel: ({ color, focused }) => {
            if (focused) {
              return (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color,
                    fontSize: 16,
                    marginTop: -10,
                  }}
                >
                  calendário
                </Text>
              )
            }
            return (
              <Text style={{ color, fontSize: 16, marginTop: -10 }}>
                calendário
              </Text>
            )
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="md-person-sharp"
                  size={28}
                  color={theme.COLORS.PURPLE_700}
                />
              )
            }

            return (
              <Ionicons
                name="md-person-outline"
                size={28}
                color={theme.COLORS.BLACK}
              />
            )
          },
          tabBarLabel: ({ color, focused }) => {
            if (focused) {
              return (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color,
                    fontSize: 16,
                    marginTop: -8,
                  }}
                >
                  perfil
                </Text>
              )
            }
            return (
              <Text style={{ color, fontSize: 16, marginTop: -8 }}>perfil</Text>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export function Stack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="TabRoutes" component={TabRoutes} />
      <Screen name="AuthStack" component={AuthStack} />
    </Navigator>
  )
}
