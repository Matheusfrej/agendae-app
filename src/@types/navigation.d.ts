import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type StackParamList = {
  HomeList: undefined
  CreateUpdateSpin: undefined
  Notifications: undefined
  Spin: undefined
  Register: undefined
  Login: undefined
  HomeCalendar: undefined
  SpinsOfDay: {
    day: string
    month: string
    year: number
  }
  Profile: undefined
}

export type PropsStack = NativeStackNavigationProp<StackParamList>

export type SpinsOfDayScreenRouteProp = RouteProp<StackParamList, 'SpinsOfDay'>
