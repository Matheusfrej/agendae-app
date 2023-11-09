import { SpinCardContainerVariant } from '@components/SpinCard'
import { UserDTO } from './userDTO'

export type SpinDTO = {
  id: string
  title: string
  description: string | null
  place: string | null
  theme_color: SpinCardContainerVariant
  start_date: string | null
  has_start_time: boolean
  end_date: string | null
  has_end_time: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  paid_status: number
  promotion_status: number
  organizer: UserDTO
}
