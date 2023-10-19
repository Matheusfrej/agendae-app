import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type StackParamList = {
  HomeList: undefined
  CreateUpdateSpin: {
    spinId: string | null
  }
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
  AddFriend: undefined
  Report: undefined
  Blocked: undefined
  EditProfile: undefined
  Friends: undefined
}

export type PropsStack = NativeStackNavigationProp<StackParamList>

export type SpinsOfDayScreenRouteProp = RouteProp<StackParamList, 'SpinsOfDay'>

export type CreateUpdateSpinScreenRouteProp = RouteProp<
  StackParamList,
  'CreateUpdateSpin'
>
