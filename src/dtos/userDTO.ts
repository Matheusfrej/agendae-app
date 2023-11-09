export type UserDTO = {
  id: string
  name: string
  nickname: string | null
  email: string
  profile_pic: string
  is_active: boolean
  friend_code: string
  created_at: Date
  updated_at: Date
}
