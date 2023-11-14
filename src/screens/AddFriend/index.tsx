import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'
import { useState } from 'react'

import * as S from './styles'
import { CustomButton } from '@components/CustomButton'
import { NavigationType } from 'src/@types/navigation'

import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '@components/CustomInput'
import { CustomModal } from '@components/CustomModal'
import { useAuth } from '../../contexts/AuthContext'
import { AppError } from '@utils/AppError'
import api from '../../libs/api'
import { UserDTO } from '../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'

interface AddFriendProps {
  navigation: NavigationType
}

const addFriendFormSchema = z.object({
  friend_id: z.string({ required_error: 'Insira um código de amigo' }),
})

type AddFriendFormInputs = z.infer<typeof addFriendFormSchema>

export function AddFriend({ navigation }: AddFriendProps) {
  const { user, setSnackbarStatus } = useAuth()

  const { control, handleSubmit, reset } = useForm<AddFriendFormInputs>({
    resolver: zodResolver(addFriendFormSchema),
  })

  const [userFound, setUserFound] = useState<UserDTO | undefined>()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const findByFriendCode = async (data: AddFriendFormInputs) => {
    try {
      const response = await api.get(`/users/friend-code/${data.friend_id}`)

      setUserFound(response.data.user)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível encontrar um usuário. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const addFriend = async () => {
    try {
      await api.post(`/users/add/${userFound?.id}`)

      setSnackbarStatus('Pedido de amizade enviado com sucesso!', true)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError
      console.log(error)

      const title = isAppError
        ? error.message
        : 'Não foi possível encontrar um usuário. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      addFriend()
    }
    setIsModalVisible(false)
  }

  const handleAddFriendSubmit = async (data: AddFriendFormInputs) => {
    const success = await findByFriendCode(data)
    if (success) {
      setIsModalVisible(true)
      reset()
    }
  }

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <S.Text>
          Seu código de amigo: <S.Span>{user?.friend_code}</S.Span>
        </S.Text>
        <S.LabelText>
          Para adicionar algúem, insira o código de amigo do usuário
        </S.LabelText>
        <S.InputSection>
          <Controller
            name="friend_id"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <CustomInput
                  value={value}
                  autoCapitalize="characters"
                  onChangeText={onChange}
                  labelText="Código"
                  errorMessage={error?.message}
                />
              )
            }}
          />
        </S.InputSection>
        <CustomButton
          text="Enviar"
          variant="default"
          fontSize={20}
          onPress={handleSubmit(handleAddFriendSubmit)}
        />
      </S.Container>
      {userFound && (
        <CustomModal
          isVisible={isModalVisible}
          buttonConfirmText="Enviar"
          isPositive
          text={`Deseja enviar uma solicitação de amizade para ${getUserSocialName(
            userFound,
          )}?`}
          onButtonPress={onModalPress}
        />
      )}
    </ScrollContainer>
  )
}
