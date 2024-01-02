import { CustomModal } from '@components/CustomModal'
import { useEffect, useState } from 'react'
import { UserDTO } from '../../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'
import api from '../../../libs/api'
import { AppError } from '@utils/AppError'
import { useFriends } from '../../../contexts/FriendsContext'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { useSnackbar } from '../../../contexts/SnackbarContext'

interface UnfriendProps {
  modalCalled: undefined | boolean
  friend: undefined | UserDTO
}

export function Unfriend({ modalCalled, friend }: UnfriendProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { setSnackbarStatus } = useSnackbar()
  const { friends, onSetFriends } = useFriends()
  const navigation = useNavigation<NavigationType>()

  const removeFriend = async () => {
    try {
      await api.post(`/users/remove/${friend?.id}`)

      const newFriends = friends.filter((f) => f.id !== friend?.id)
      onSetFriends(newFriends)
      setSnackbarStatus('Removido com sucesso', true)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível desfazer a amizade. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await removeFriend()
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
      buttonConfirmText="Desfazer"
      text={`Tem certeza que deseja desfazer sua amizade com 
      ${friend && getUserSocialName(friend)}?`}
      onButtonPress={onModalPress}
    />
  )
}
