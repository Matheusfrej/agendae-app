import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { CustomButton } from '@components/CustomButton'
import { NavigationType } from 'src/@types/navigation'
import { ProfileImage } from '@components/ProfileImage'

import { useEffect, useState } from 'react'

import * as z from 'zod'
import { CustomInput } from '@components/CustomInput'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../libs/api'
import { AppError } from '@utils/AppError'
import { CustomModal } from '@components/CustomModal'

interface EditProfileProps {
  navigation: NavigationType
}

const editProfileFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, { message: 'Nome é obrigatório' })
    .max(100, 'Tamanho máximo atingido'),
  nickname: z.string().max(100).optional(),
})

type editProfileFormInputs = z.infer<typeof editProfileFormSchema>

export function EditProfile({ navigation }: EditProfileProps) {
  const { setSnackbarStatus, signOut, user, userUpdate } = useAuth()

  const { control, handleSubmit, reset, setValue } =
    useForm<editProfileFormInputs>({
      resolver: zodResolver(editProfileFormSchema),
    })

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const editProfile = async (data: editProfileFormInputs) => {
    try {
      console.log(data)

      const response = await api.put('/users', data)

      userUpdate(response.data.user)
      setSnackbarStatus('Perfil editado com sucesso!', true)
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

  const deleteProfile = async () => {
    try {
      await api.delete('/users')

      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível excluir sua conta. Tente novamente mais tarde.'
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

  const toggleModal = () => {
    setIsModalVisible(true)
  }

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await deleteProfile()
      if (success) {
        navigation.navigate('Profile')
        signOut()
      }
    }
    setIsModalVisible(false)
  }

  useEffect(() => {
    setValue('name', user.name)
    setValue('nickname', user.nickname)
  }, [user, setValue])

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
      <S.TextContainer onPress={() => toggleModal()}>
        <S.Text>Excluir minha conta</S.Text>
      </S.TextContainer>
      <CustomModal
        text="Tem certeza que deseja excluir sua conta?"
        isVisible={isModalVisible}
        buttonConfirmText="Excluir"
        onButtonPress={onModalPress}
        warningText="Essa ação é irreversível"
      />
    </ScrollContainer>
  )
}
