import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SpinDTO } from '../dtos/spinDTO'
import { UserDTO } from '../dtos/userDTO'

type StackParamList = {
  HomeList: undefined
  CreateUpdateSpin:
    | undefined
    | {
        spin: SpinDTO
      }
  Notifications: undefined
  Spin: {
    spin: SpinDTO
  }
  AuthStack: {
    screen: 'Login' | 'Register'
  }
  HomeCalendar: undefined
  SpinsOfDay: {
    day: string
    month: string
    year: number
  }
  ProfileStack: {
    screen: 'Profile'
    params?: {
      user: UserDTO
      isFriendRequest?: boolean
    }
  }
  OtherProfile:
    | undefined
    | {
        user: UserDTO
        isFriendRequest?: boolean
      }
  Profile:
    | undefined
    | {
        user: UserDTO
        isFriendRequest?: boolean
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

export type SpinScreenRouteProp = RouteProp<StackParamList, 'Spin'>

export type ProfileScreenRouteProp = RouteProp<StackParamList, 'Profile'>
