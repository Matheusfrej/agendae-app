import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../theme/global'

import * as S from './styles'

export function Login() {
  return (
    <ScrollContainer>
      <S.Container>
        <S.Title>Login</S.Title>
        <S.Content>
          <S.Form>
            <S.InputSection>
              <S.Label>Email</S.Label>
              <S.TextInput></S.TextInput>
            </S.InputSection>
            <S.InputSection>
              <S.Label>Senha</S.Label>
              <S.TextInput></S.TextInput>
            </S.InputSection>
          </S.Form>
          <S.Register>
            <S.Text>Não possui uma conta?</S.Text>
            <S.Touchable>
              <S.Span>Cadastre-se aqui</S.Span>
            </S.Touchable>
          </S.Register>
          <S.ButtonContainer>
            <CustomButton text="Entrar" variant="default" />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
