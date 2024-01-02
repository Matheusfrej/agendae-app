import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Logo } from '@components/Logo'
import { BackButton } from '@components/BackButton'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '@components/CustomInput'
import { AppError } from '@utils/AppError'
import api from '../../libs/api'
import { useSnackbar } from '../../contexts/SnackbarContext'

const forgotPasswordFormSchema = z.object({
  email: z
    .string({ required_error: 'Informe um email' })
    .email({ message: 'Informe um email válido' }),
})

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPassword() {
  const { setSnackbarStatus } = useSnackbar()

  const { control, handleSubmit, reset } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  const getResetPasswordLink = async (email: string) => {
    try {
      await api.get(`/users/change-password/${email}`)
      setSnackbarStatus(
        'Enviamos um email com instruções para alterar sua senha',
        true,
      )

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

  const handleForgotPassword = async (data: ForgotPasswordFormInputs) => {
    const success = await getResetPasswordLink(data.email)
    if (!success) {
      reset()
    }
  }

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <Logo style={{ marginBottom: 50 }} />
        <S.Content>
          <S.Title>Esqueceu sua senha?</S.Title>
          <S.Subtitle>
            Enviaremos um email com instruções para redefinir sua senha
          </S.Subtitle>
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
          </S.Form>
          <S.ButtonContainer>
            <CustomButton
              fontSize={16}
              text="Enviar"
              variant="default"
              onPress={handleSubmit(handleForgotPassword)}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
