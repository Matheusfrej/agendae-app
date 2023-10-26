import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { Label } from '@components/Label'

export function Register() {
  const theme = useTheme()

  const navigation = useNavigation<NavigationType>()

  const navigateToLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <ScrollContainer>
      <S.Container>
        <S.Title>Cadastre-se</S.Title>
        <S.Content>
          <S.Form>
            <S.InputSection>
              <Label text="Nome" isRequired />
              <S.TextInput
                selectionColor={theme.COLORS.BLUE}
                cursorColor={theme.COLORS.GRAY_700}
              />
            </S.InputSection>
            <S.InputSection>
              <Label text="Apelido" />
              <S.TextInput
                selectionColor={theme.COLORS.BLUE}
                cursorColor={theme.COLORS.GRAY_700}
              />
            </S.InputSection>
            <S.InputSection>
              <Label text="Email" isRequired />

              <S.TextInput
                inputMode="email"
                autoCapitalize="none"
                selectionColor={theme.COLORS.BLUE}
                cursorColor={theme.COLORS.GRAY_700}
              />
            </S.InputSection>
            <S.InputSection>
              <Label text="Senha" isRequired />
              <S.TextInput
                autoCapitalize="none"
                selectionColor={theme.COLORS.BLUE}
                cursorColor={theme.COLORS.GRAY_700}
                secureTextEntry
              />
            </S.InputSection>
            <S.InputSection>
              <Label text="Confirmar senha" isRequired />
              <S.TextInput
                autoCapitalize="none"
                selectionColor={theme.COLORS.BLUE}
                cursorColor={theme.COLORS.GRAY_700}
                secureTextEntry
              />
            </S.InputSection>
          </S.Form>
          <S.Login>
            <S.Text>Já possui uma conta?</S.Text>
            <S.Touchable onPress={() => navigateToLogin()}>
              <S.Span>Faça login aqui</S.Span>
            </S.Touchable>
          </S.Login>
          <S.ButtonContainer>
            <CustomButton
              fontSize={16}
              text="Cadastrar"
              variant="default"
              onPress={() => navigateToLogin()}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
