import { CustomModal } from '@components/CustomModal'
import { useEffect, useState } from 'react'
import { UserDTO } from '../../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'
import api from '../../../libs/api'
import { AppError } from '@utils/AppError'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { useBlocked } from '../../../contexts/BlockedContext'
import { useFriends } from '../../../contexts/FriendsContext'
import { useSnackbar } from '../../../contexts/SnackbarContext'

interface BlockProps {
  modalCalled: undefined | boolean
  user: undefined | UserDTO
}

export function Block({ modalCalled, user }: BlockProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { setSnackbarStatus } = useSnackbar()
  const { blocked, onSetBlocked } = useBlocked()
  const { friends, onSetFriends } = useFriends()
  const navigation = useNavigation<NavigationType>()

  const blockUser = async () => {
    try {
      if (user) {
        await api.post(`/users/block/${user?.id}`)

        const is_friend = friends.find((f) => {
          return f.id === user.id
        })

        if (is_friend) {
          onSetFriends(friends.filter((f) => f.id !== user?.id))
        }

        const newBlocked = [...blocked, user]
        onSetBlocked(newBlocked)
        setSnackbarStatus(
          `${getUserSocialName(user)} bloqueado com sucesso`,
          true,
        )
      }
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível bloquear o usuário. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await blockUser()
      if (success) {
        navigation.goBack()
      }
    }
    setIsVisible(false)
  }

  useEffect(() => {
    if (modalCalled !== undefined) {
      setIsVisible(true)
    }
  }, [modalCalled])

  return (
    <CustomModal
      isVisible={isVisible}
      buttonConfirmText="Bloquear"
      text={`Tem certeza que deseja bloquear ${
        user && getUserSocialName(user)
      }?`}
      onButtonPress={onModalPress}
    />
  )
}
