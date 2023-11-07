import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { CustomButton } from '@components/CustomButton'
import { NavigationType } from 'src/@types/navigation'
import { ProfileImage } from '@components/ProfileImage'

import * as z from 'zod'
import { CustomInput } from '@components/CustomInput'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../libs/api'
import { AppError } from '@utils/AppError'

interface EditProfileProps {
  navigation: NavigationType
}

const editProfileFormSchema = z.object({
  name: z.string().min(1).max(100, 'Tamanho máximo atingido').optional(),
  nickname: z.string().min(1).max(100).optional(),
})

type editProfileFormInputs = z.infer<typeof editProfileFormSchema>

export function EditProfile({ navigation }: EditProfileProps) {
  const { setSnackbarStatus } = useAuth()

  const { control, handleSubmit, reset } = useForm<editProfileFormInputs>({
    resolver: zodResolver(editProfileFormSchema),
  })

  const editProfile = async (data: editProfileFormInputs) => {
    try {
      const response = await api.put('/users', data)

      setSnackbarStatus('Perfil editado com sucesso!', true)
      console.log(response.data)

      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível seu perfil. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const handleEditProfile = async (data: editProfileFormInputs) => {
    const success = await editProfile(data)
    if (success) {
      navigation.navigate('Profile')
      reset()
    }
  }

  return (
    <ScrollContainer>
      <BackButton />
      <S.SaveButtonContainer>
        <CustomButton
          text="Salvar"
          variant="accept"
          fontSize={20}
          onPress={handleSubmit(handleEditProfile)}
        />
      </S.SaveButtonContainer>
      <S.Container>
        <S.Title>Editar perfil</S.Title>
        <S.ProfileImageContainer>
          <ProfileImage size={100} />
        </S.ProfileImageContainer>
        <S.Form>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <CustomInput
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
            render={({ field: { onChange, value }, fieldState: { error } }) => {
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
        </S.Form>
      </S.Container>
      <S.TextContainer>
        <S.Text>Excluir minha conta</S.Text>
      </S.TextContainer>
    </ScrollContainer>
  )
}
