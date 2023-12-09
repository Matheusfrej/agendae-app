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
import { SpinDTO } from 'src/dtos/spinDTO'

interface InviteProps {
  user?: UserDTO
  spin?: SpinDTO
  type: 'friend' | 'spin'
}

export function Invite({ user, spin, type }: InviteProps) {
  const theme = useTheme()
  const {
    acceptFriendInvite,
    denyFriendInvite,
    acceptSpinInvite,
    denySpinInvite,
  } = useNotifications()

  const navigation = useNavigation<NavigationType>()

  const navigateToInvite = () => {
    if (type === 'friend' && user) {
      navigation.navigate('OtherProfile', {
        user,
        isFriendRequest: true,
      })
    } else if (type === 'spin' && spin) {
      navigation.navigate('Spin', { spin, isSpinRequest: true })
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
                  onPress={() => {
                    if (user && type === 'friend') {
                      acceptFriendInvite(user)
                    } else if (spin && type === 'spin') {
                      acceptSpinInvite(spin)
                    }
                  }}
                />
                <CustomButton
                  variant="deny"
                  text="Recusar"
                  onPress={() => {
                    if (user && type === 'friend') {
                      denyFriendInvite(user)
                    } else if (spin && type === 'spin') {
                      denySpinInvite(spin)
                    }
                  }}
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
