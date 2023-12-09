import { getUserSocialName } from '@utils/format'
import { UserDTO } from '../../dtos/userDTO'
import * as S from './styles'
import { ProfileImage } from '@components/ProfileImage'

interface ItemCardProps {
  user: UserDTO
  onPress: any
}

export function ItemCard({ user, onPress }: ItemCardProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Content>
        <ProfileImage size={40} />
        <S.Section>
          <S.Name>{getUserSocialName(user)}</S.Name>
        </S.Section>
      </S.Content>
    </S.Container>
  )
}
