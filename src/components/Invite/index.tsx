import * as S from './styles'
import { Nav } from 'src/@types/navigation'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { CustomButton } from '@components/CustomButton'

interface InviteProps {
  name: string
  type: 'friend' | 'spin'
}

export function Invite({ name, type }: InviteProps) {
  const theme = useTheme()

  const navigation = useNavigation<Nav>()

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
                <CustomButton variant="accept" />
                <CustomButton variant="deny" />
              </S.Actions>
            </S.Section>
          </S.Content>
        </S.Container>
        <S.Bar></S.Bar>
      </>
    </S.InviteContainer>
  )
}
