import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { CustomButton } from '@components/CustomButton'
import { PropsStack } from 'src/@types/navigation'
import { Line } from '@components/Line'

interface InviteBannerProps {
  type: 'friend' | 'spin'
}

export function InviteBanner({ type }: InviteBannerProps) {
  const theme = useTheme()

  const navigation = useNavigation<PropsStack>()

  const navigateToInvite = () => {
    if (type === 'friend') {
      navigation.navigate('Profile')
    } else if (type === 'spin') {
      navigation.navigate('Spin')
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
            />
            <CustomButton
              variant="deny"
              text="Recusar"
              style={{ paddingLeft: 30, paddingRight: 30 }}
            />
          </S.Actions>
        </S.Container>
        <Line />
      </>
    </S.InviteContainer>
  )
}
