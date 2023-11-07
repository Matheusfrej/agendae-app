import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useTheme } from 'styled-components'
import { NavigationType } from 'src/@types/navigation'
import { Label } from '@components/Label'
import { Logo } from '@components/Logo'
import { useAuth } from '../../contexts/AuthContext'
import { BackButton } from '@components/BackButton'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface LoginProps {
  navigation: NavigationType
}

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'Informe um email' })
    .email({ message: 'Informe um email válido' }),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(6, { message: 'A senha deve conter ao menos 6 caracteres' }),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function Login({ navigation }: LoginProps) {
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  const theme = useTheme()

  const navigateToRegister = () => {
    navigation.navigate('AuthStack', { screen: 'Register' })
  }

  const handleSignIn = async (data: LoginFormInputs) => {
    const success = await signIn(data.email, data.password)
    if (success) {
      navigation.navigate('Profile')
      reset()
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
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <S.TextInput
                        inputMode="email"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        selectionColor={theme.COLORS.BLUE}
                        cursorColor={theme.COLORS.GRAY_700}
                      />
                      {error && error.message !== '' && (
                        <S.ErrorMessageText>{error.message}</S.ErrorMessageText>
                      )}
                    </>
                  )
                }}
              />
            </S.InputSection>
            <S.InputSection>
              <Label text="Senha" />
              <Controller
                name="password"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <S.TextInput
                        autoCapitalize="none"
                        selectionColor={theme.COLORS.BLUE}
                        cursorColor={theme.COLORS.GRAY_700}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                      />
                      {error && error.message !== '' && (
                        <S.ErrorMessageText>{error.message}</S.ErrorMessageText>
                      )}
                    </>
                  )
                }}
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
              onPress={handleSubmit(handleSignIn)}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
