import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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

const Tab = createBottomTabNavigator()

function Routes() {
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
        name="HomeList"
        component={HomeList}
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
        name="HomeCalendar"
        component={HomeCalendar}
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
        name="profile"
        component={Profile}
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

export { Routes }
