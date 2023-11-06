import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useTheme } from 'styled-components'
import { NavigationType } from 'src/@types/navigation'
import { Label } from '@components/Label'
import { Logo } from '@components/Logo'
import { useAuth } from '../../contexts/AuthContext'
import { BackButton } from '@components/BackButton'

interface LoginProps {
  navigation: NavigationType
}

export function Login({ navigation }: LoginProps) {
  const { signIn } = useAuth()

  const theme = useTheme()

  const navigateToRegister = () => {
    navigation.navigate('AuthStack', { screen: 'Register' })
  }

  const handleSignIn = async () => {
    console.log('clicou')

    const success = await signIn('matheusfrej@gmail.com', '123456')
    if (success) {
      navigation.navigate('Profile')
    }
  }

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <Logo style={{ marginBottom: 50 }} />
        <S.Title>Login</S.Title>
        <S.Content>
          <S.Form>
            <S.InputSection>
              <Label text="Email" />
              <S.TextInput
                inputMode="email"
                autoCapitalize="none"
                selectionColor={theme.COLORS.BLUE}
                cursorColor={theme.COLORS.GRAY_700}
              />
            </S.InputSection>
            <S.InputSection>
              <Label text="Senha" />
              <S.TextInput
                autoCapitalize="none"
                selectionColor={theme.COLORS.BLUE}
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
            <CustomButton
              fontSize={16}
              text="Entrar"
              variant="default"
              onPress={() => handleSignIn()}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
