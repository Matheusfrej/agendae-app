import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { Logo } from '@components/Logo'
import { BackButton } from '@components/BackButton'
import * as z from 'zod'
import { CustomInput } from '@components/CustomInput'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../contexts/AuthContext'

const registerFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome é obrigatório' })
      .min(1)
      .max(100, 'Tamanho máximo atingido'),
    nickname: z.string().min(1).max(100).optional(),
    email: z
      .string({ required_error: 'Email é obrigatório' })
      .email({ message: 'Informe um email válido' }),
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

type registerFormInputs = z.infer<typeof registerFormSchema>

export function Register() {
  const { register } = useAuth()

  const navigation = useNavigation<NavigationType>()

  const { control, handleSubmit, reset, resetField } =
    useForm<registerFormInputs>({
      resolver: zodResolver(registerFormSchema),
    })

  const handleRegister = async (data: registerFormInputs) => {
    const success = await register(data)
    if (success) {
      navigation.navigate('AuthStack', { screen: 'Login' })
      reset()
    }
  }

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <Logo style={{ paddingBottom: 50 }} />

        <S.Title>Cadastre-se</S.Title>
        <S.Content>
          <S.Form>
            <Controller
              name="name"
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
                    labelText="Nome"
                    autoCapitalize="words"
                    errorMessage={error?.message}
                  />
                )
              }}
            />
            <Controller
              name="nickname"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomInput
                    value={value}
                    onChangeText={onChange}
                    labelText="Apelido"
                    autoCapitalize="sentences"
                    errorMessage={error?.message}
                  />
                )
              }}
            />
            <Controller
              name="email"
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
                    labelText="Email"
                    inputMode="email"
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
          <S.Login>
            <S.Text>Já possui uma conta?</S.Text>
            <S.Touchable
              onPress={() =>
                navigation.navigate('AuthStack', { screen: 'Login' })
              }
            >
              <S.Span>Faça login aqui</S.Span>
            </S.Touchable>
          </S.Login>
          <S.ButtonContainer>
            <CustomButton
              fontSize={16}
              text="Cadastrar"
              variant="default"
              onPress={handleSubmit(handleRegister)}
            />
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </ScrollContainer>
  )
}
