import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useTheme } from 'styled-components'
import { CustomButton } from '@components/CustomButton'
import { PropsStack } from 'src/@types/navigation'

interface AddFriendProps {
  navigation: PropsStack
}

export function AddFriend({ navigation }: AddFriendProps) {
  const theme = useTheme()

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <S.Text>
          Seu código de amigo: <S.Span>E4HT6KP</S.Span>
        </S.Text>
        <S.LabelText>
          Para adicionar algúem, insira o código de amigo do usuário
        </S.LabelText>
        <S.InputSection>
          <S.TextInput
            selectionColor={theme.COLORS.BLUE}
            cursorColor={theme.COLORS.GRAY_700}
            placeholder="Código"
          />
        </S.InputSection>
        <CustomButton
          text="Enviar"
          variant="default"
          fontSize={20}
          onPress={() => navigation.navigate('Friends')}
        />
      </S.Container>
    </ScrollContainer>
  )
}
