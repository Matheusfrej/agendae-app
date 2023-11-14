import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { NavigationType } from 'src/@types/navigation'
import { Line } from '@components/Line'
import { ProfileImage } from '@components/ProfileImage'
import { UserDTO } from '../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'

interface FriendCardProps {
  user: UserDTO
}

export function FriendCard({ user }: FriendCardProps) {
  const theme = useTheme()

  const navigation = useNavigation<NavigationType>()

  return (
    <S.FriendCardContainer
      activeOpacity={0.7}
      onPress={() => navigation.navigate('OtherProfile', { user })}
      underlayColor={theme.COLORS.GRAY_300}
    >
      <>
        <S.Container>
          <S.Content>
            <ProfileImage size={60} />
            <S.Section>
              <S.Texts>
                <S.Name>{getUserSocialName(user)}</S.Name>
              </S.Texts>
            </S.Section>
          </S.Content>
        </S.Container>
        <Line />
      </>
    </S.FriendCardContainer>
  )
}
