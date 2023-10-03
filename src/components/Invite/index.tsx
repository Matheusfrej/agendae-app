import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { CustomButton } from '@components/CustomButton'
import { PropsStack } from 'src/@types/navigation'
import { Line } from '@components/Line'

interface InviteProps {
  name: string
  type: 'friend' | 'spin'
}

export function Invite({ name, type }: InviteProps) {
  const theme = useTheme()

  const navigation = useNavigation<PropsStack>()

  const goBack = () => {
    navigation.navigate('Notifications')
  }

  return (
    <S.InviteContainer
      activeOpacity={0.7}
      onPress={() => goBack()}
      underlayColor={theme.COLORS.GRAY_300}
    >
      <>
        <S.Container>
          <S.Content>
            <S.ProfileImage></S.ProfileImage>
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
