import * as S from './styles'
import { CustomButton } from '@components/CustomButton'
import { Line } from '@components/Line'
import { useNotifications } from '../../contexts/NotificationsContext'
import { UserDTO } from '../../dtos/userDTO'
import { SpinDTO } from '../../dtos/spinDTO'

interface InviteBannerProps {
  type: 'friend' | 'spin'
  user?: UserDTO
  spin?: SpinDTO
  accepted: () => void
  denied: () => void
}

export function InviteBanner({
  type,
  user,
  spin,
  accepted,
  denied,
}: InviteBannerProps) {
  const {
    acceptFriendInvite,
    denyFriendInvite,
    acceptSpinInvite,
    denySpinInvite,
  } = useNotifications()

  const acceptInvite = async () => {
    if (user && type === 'friend') {
      const success = await acceptFriendInvite(user)

      if (success) {
        accepted()
      }
    } else if (spin && type === 'spin') {
      const success = await acceptSpinInvite(spin)

      if (success) {
        accepted()
      }
    }
  }

  const denyInvite = async () => {
    if (user && type === 'friend') {
      const success = await denyFriendInvite(user)
      if (success) {
        denied()
      }
    } else if (spin && type === 'spin') {
      const success = await denySpinInvite(spin)

      if (success) {
        denied()
      }
    }
  }

  return (
    <S.InviteContainer>
      <>
        <Line />
        <S.Container>
          <S.Texts>
            {type === 'friend' ? (
              <S.Description>Pedido de amizade</S.Description>
            ) : (
              <S.Description>Convite para o rolê</S.Description>
            )}
          </S.Texts>
          <S.Actions>
            <CustomButton
              variant="accept"
              text="Aceitar"
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onPress={() => acceptInvite()}
            />
            <CustomButton
              variant="deny"
              text="Recusar"
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onPress={() => denyInvite()}
            />
          </S.Actions>
        </S.Container>
        <Line />
      </>
    </S.InviteContainer>
  )
}
