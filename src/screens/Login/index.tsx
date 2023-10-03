import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../theme/global'

import * as S from './styles'
import { useTheme } from 'styled-components'
import { PropsStack } from 'src/@types/navigation'

interface LoginProps {
  navigation: PropsStack
}

export function Login({ navigation }: LoginProps) {
  const theme = useTheme()

  const navigateToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <ScrollContainer>
      <S.Container>
        <S.Title>Login</S.Title>
        <S.Content>
          <S.Form>
            <S.InputSection>
              <S.Label>Email</S.Label>
              <S.TextInput
                inputMode="email"
                autoCapitalize="none"
                cursorColor={theme.COLORS.GRAY_700}
              />
            </S.InputSection>
            <S.InputSection>
              <S.Label>Senha</S.Label>
              <S.TextInput
                autoCapitalize="none"
                cursorColor={theme.COLORS.GRAY_700}
                secureTextEntry
              />
            </S.InputSection>
          </S.Form>
          <S.Register>
            <S.Text>Não possui uma conta?</S.Text>
            <S.Touchable onPress={() => navigateToRegister()}>
              <S.Span>Cadastre-se aqui</S.Span>
            </S.Touchable>
          </S.Register>
          <S.ButtonContainer>
            <CustomButton fontSize={16} text="Entrar" variant="default" />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
