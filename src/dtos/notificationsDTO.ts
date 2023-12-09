import { SpinDTO } from './spinDTO'
import { UserDTO } from './userDTO'

export type NotificationsDTO =
  | {
      type: 'friend'
      user: UserDTO
    }
  | {
      type: 'spin'
      spin: SpinDTO
    }
