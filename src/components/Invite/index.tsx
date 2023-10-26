import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { CustomButton } from '@components/CustomButton'
import { NavigationType } from 'src/@types/navigation'
import { Line } from '@components/Line'
import { ProfileImage } from '@components/ProfileImage'

interface InviteProps {
  name: string
  type: 'friend' | 'spin'
}

export function Invite({ name, type }: InviteProps) {
  const theme = useTheme()

  const navigation = useNavigation<NavigationType>()

  const navigateToInvite = () => {
    if (type === 'friend') {
      navigation.navigate('Profile')
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
                <S.Name>{name}</S.Name>
                {type === 'friend' ? (
                  <S.Description>solicitação de amizade</S.Description>
                ) : (
                  <S.Description>convite para rolê</S.Description>
                )}
              </S.Texts>
              <S.Actions>
                <CustomButton variant="accept" text="Aceitar" />
                <CustomButton variant="deny" text="Recusar" />
              </S.Actions>
            </S.Section>
          </S.Content>
        </S.Container>
        <Line />
      </>
    </S.InviteContainer>
  )
}
