import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from 'src/@types/navigation'

export function Register() {
  const theme = useTheme()

  const navigation = useNavigation<PropsStack>()

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
              <S.Label>Nome Completo</S.Label>
              <S.TextInput cursorColor={theme.COLORS.GRAY_700} />
            </S.InputSection>
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
            <S.InputSection>
              <S.Label>Confirmar senha</S.Label>
              <S.TextInput
                autoCapitalize="none"
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
