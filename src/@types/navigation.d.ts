import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type StackParamList = {
  HomeList: undefined
  CreateUpdateSpin: {
    spinId: string | null
  }
  Notifications: undefined
  Spin: undefined
  AuthStack: {
    screen: 'Login' | 'Register'
  }
  HomeCalendar: undefined
  SpinsOfDay: {
    day: string
    month: string
    year: number
  }
  Profile:
    | undefined
    | {
        userId: string
        isFriendRequest: boolean
      }
  AddFriend: undefined
  Report: undefined
  Blocked: undefined
  EditProfile: undefined
  Friends: undefined
}

export type NavigationType = NativeStackNavigationProp<StackParamList>

export type SpinsOfDayScreenRouteProp = RouteProp<StackParamList, 'SpinsOfDay'>

export type CreateUpdateSpinScreenRouteProp = RouteProp<
  StackParamList,
  'CreateUpdateSpin'
>

export type ProfileScreenRouteProp = RouteProp<StackParamList, 'Profile'>
