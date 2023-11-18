import { CustomModal } from '@components/CustomModal'
import { useEffect, useState } from 'react'
import { UserDTO } from '../../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'
import api from '../../../libs/api'
import { useAuth } from '../../../contexts/AuthContext'
import { AppError } from '@utils/AppError'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { useBlocked } from '../../../contexts/BlockedContext'

interface UnblockProps {
  modalCalled: undefined | boolean
  user_blocked: undefined | UserDTO
}

export function Unblock({ modalCalled, user_blocked }: UnblockProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { setSnackbarStatus } = useAuth()
  const { blocked, onSetBlocked } = useBlocked()
  const navigation = useNavigation<NavigationType>()

  const unblockUser = async () => {
    try {
      await api.post(`/users/unblock/${user_blocked?.id}`)

      const newBlocked = blocked.filter((b) => b.id !== user_blocked?.id)
      onSetBlocked(newBlocked)
      setSnackbarStatus('Desbloqueado com sucesso', true)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível desbloquear o usuário. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await unblockUser()
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
      buttonConfirmText="Desbloquear"
      text={`Tem certeza que deseja desbloquear ${
        user_blocked && getUserSocialName(user_blocked)
      }?`}
      onButtonPress={onModalPress}
    />
  )
}
