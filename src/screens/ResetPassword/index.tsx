import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Logo } from '@components/Logo'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '@components/CustomInput'
import { AppError } from '@utils/AppError'
import api from '../../libs/api'
import { useSnackbar } from '../../contexts/SnackbarContext'
import {
  NavigationType,
  ResetPasswordScreenRouteProp,
} from '../../@types/navigation'
import { useRoute } from '@react-navigation/native'

type ResetPasswordProps = {
  navigation: NavigationType
}

const resetPasswordFormSchema = z
  .object({
    code: z
      .string({ required_error: 'O código de verificação é obrigatório' })
      .min(1, { message: 'O código de verificação é obrigatório' })
      .max(60),
    password: z
      .string({ required_error: 'Senha é obrigatório' })
      .min(6, { message: 'A senha deve conter 6 caracteres' })
      .refine((value) => /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value), {
        message: 'A senha deve conter letras e números',
      }),
    confirmPassword: z.string({
      required_error: 'Confirmar a senha é obrigatório',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  })

type ResetPasswordFormInputs = z.infer<typeof resetPasswordFormSchema>

export function ResetPassword({ navigation }: ResetPasswordProps) {
  const { setSnackbarStatus } = useSnackbar()
  const route = useRoute<ResetPasswordScreenRouteProp>()

  const token = route.params.jwtEmail

  const { control, handleSubmit, reset } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const resetPassword = async (data: ResetPasswordFormInputs) => {
    try {
      await api.post(`/users/change-password`, { ...data, token })

      setSnackbarStatus('Senha alterada com sucesso!', true)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível enviar o email. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const handleResetPassword = async (data: ResetPasswordFormInputs) => {
    const success = await resetPassword(data)
    if (success) {
      navigation.navigate('AuthStack', { screen: 'Login' })
    } else {
      reset()
    }
  }

  return (
    <ScrollContainer>
      <S.Container>
        <Logo style={{ marginBottom: 50 }} />
        <S.Content>
          <S.Title>Escolha a nova senha</S.Title>
          <S.Form>
            <Controller
              name="code"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomInput
                    isRequired
                    value={value}
                    autoCapitalize="characters"
                    onChangeText={onChange}
                    labelText="Código de verificação"
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
                    isRequired
                    value={value}
                    onChangeText={onChange}
                    labelText="Senha"
                    secureTextEntry
                    errorMessage={error?.message}
                  />
                )
              }}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomInput
                    isRequired
                    value={value}
                    onChangeText={onChange}
                    labelText="Confirmar senha"
                    secureTextEntry
                    errorMessage={error?.message}
                  />
                )
              }}
            />
          </S.Form>
          <S.ButtonContainer>
            <CustomButton
              fontSize={16}
              text="Confirmar"
              variant="default"
              onPress={handleSubmit(handleResetPassword)}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
