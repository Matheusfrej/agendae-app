import { UserDTO } from './userDTO'

export type NotificationsDTO =
  | {
      type: 'friend'
      user: UserDTO
    }
  | {
      type: 'spin'
      organizer: UserDTO
      id: string
      title: string
    }
