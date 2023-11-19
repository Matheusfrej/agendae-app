import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { CustomButton } from '@components/CustomButton'
import { NavigationType } from 'src/@types/navigation'
import { Line } from '@components/Line'
import { ProfileImage } from '@components/ProfileImage'
import { UserDTO } from '../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'
import { useNotifications } from '../../contexts/NotificationsContext'

interface InviteProps {
  user?: UserDTO
  type: 'friend' | 'spin'
}

export function Invite({ user, type }: InviteProps) {
  const theme = useTheme()
  const { acceptFriendInvite, denyFriendInvite } = useNotifications()

  const navigation = useNavigation<NavigationType>()

  const navigateToInvite = () => {
    if (type === 'friend' && user) {
      navigation.navigate('OtherProfile', {
        user,
        isFriendRequest: true,
      })
    } else if (type === 'spin') {
      navigation.navigate('Spin')
    }
  }

  return (
    <S.InviteContainer
      activeOpacity={0.7}
      onPress={() => navigateToInvite()}
      underlayColor={theme.COLORS.GRAY_300}
    >
      <>
        <S.Container>
          <S.Content>
            <ProfileImage size={60} />
            <S.Section>
              <S.Texts>
                <S.Name>{user && getUserSocialName(user)}</S.Name>
                {type === 'friend' ? (
                  <S.Description>solicitação de amizade</S.Description>
                ) : (
                  <S.Description>convite para rolê</S.Description>
                )}
              </S.Texts>
              <S.Actions>
                <CustomButton
                  variant="accept"
                  text="Aceitar"
                  onPress={() => user && acceptFriendInvite(user)}
                />
                <CustomButton
                  variant="deny"
                  text="Recusar"
                  onPress={() => user && denyFriendInvite(user)}
                />
              </S.Actions>
            </S.Section>
          </S.Content>
        </S.Container>
        <Line />
      </>
    </S.InviteContainer>
  )
}
