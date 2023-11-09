import { UserDTO } from '../dtos/userDTO'

export function convertToLocaleDate(isoDateString: string, hasTime: boolean) {
  if (!isoDateString) {
    return
  }
  const date = new Date(isoDateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')

  if (hasTime) {
    return `${day}/${month}/${year} ${hour}h${minute}`
  }
  return `${day}/${month}/${year}`
}

export function getUserSocialName(user: UserDTO) {
  return user.nickname || user.name.split(' ')[0]
}
