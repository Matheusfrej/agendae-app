import { UserDTO } from '../dtos/userDTO'

export function convertToLocaleDate(isoDateString: string, hasTime: boolean) {
  if (isoDateString) {
    if (!hasTime) {
      return new Date(isoDateString).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
    return new Date(isoDateString)
      .toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
      .replace(',', '')
  }
}

export function getUserSocialName(user: UserDTO) {
  return user.nickname || user.name.split(' ')[0]
}
