import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { NavigationType } from 'src/@types/navigation'
import { Logo } from '@components/Logo'
import { useAuth } from '../../contexts/AuthContext'
import { BackButton } from '@components/BackButton'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '@components/CustomInput'

interface LoginProps {
  navigation: NavigationType
}

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'Informe um email' })
    .email({ message: 'Informe um email válido' }),
  password: z.string({ required_error: 'Informe uma senha' }),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function Login({ navigation }: LoginProps) {
  const { signIn } = useAuth()

  const { control, handleSubmit, reset, resetField } = useForm<LoginFormInputs>(
    {
      resolver: zodResolver(loginFormSchema),
    },
  )

  const navigateToForgotPassword = () => {
    navigation.navigate('AuthStack', { screen: 'ForgotPassword' })
  }

  const navigateToRegister = () => {
    navigation.navigate('AuthStack', { screen: 'Register' })
  }

  const handleSignIn = async (data: LoginFormInputs) => {
    const success = await signIn(data.email, data.password)
    if (success) {
      navigation.navigate('Profile')
      reset()
    } else {
      resetField('password')
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
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomInput
                    inputMode="email"
                    value={value}
                    onChangeText={onChange}
                    labelText="Email"
                    errorMessage={error?.message}
                  />
                )
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomInput
                    value={value}
                    onChangeText={onChange}
                    labelText="Senha"
                    secureTextEntry
                    errorMessage={error?.message}
                  />
                )
              }}
            />
          </S.Form>
          <S.ForgotPassword>
            <S.Touchable onPress={() => navigateToForgotPassword()}>
              <S.Span>Esqueci minha senha</S.Span>
            </S.Touchable>
          </S.ForgotPassword>
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
