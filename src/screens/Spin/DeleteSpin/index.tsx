import { CustomModal } from '@components/CustomModal'
import { useEffect, useState } from 'react'
import api from '../../../libs/api'
import { useAuth } from '../../../contexts/AuthContext'
import { AppError } from '@utils/AppError'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { SpinDTO } from '../../../dtos/spinDTO'
import { useSpins } from '../../../contexts/SpinsContext'

interface DeleteSpinProps {
  modalCalled: undefined | boolean
  spin: undefined | SpinDTO
}

export function DeleteSpin({ modalCalled, spin }: DeleteSpinProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { setSnackbarStatus } = useAuth()
  const { spins, spinsUpdate } = useSpins()
  const navigation = useNavigation<NavigationType>()

  const deleteSpin = async () => {
    try {
      await api.delete(`/spins/${spin?.id}`)

      const newSpins = spins?.filter((s) => s.id !== spin?.id)

      if (newSpins !== undefined) spinsUpdate(newSpins)
      setSnackbarStatus('rolê excluído com sucesso', true)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível deletar esse rolê. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await deleteSpin()
      if (success) {
        navigation.navigate('HomeList')
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
      text="Tem certeza que deseja excluir esse rolê?"
      isVisible={isVisible}
      buttonConfirmText="Excluir"
      onButtonPress={onModalPress}
    />
  )
}
