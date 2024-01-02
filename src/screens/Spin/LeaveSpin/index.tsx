import { CustomModal } from '@components/CustomModal'
import { useEffect, useState } from 'react'
import api from '../../../libs/api'
import { AppError } from '@utils/AppError'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { SpinDTO } from '../../../dtos/spinDTO'
import { useSpins } from '../../../contexts/SpinsContext'
import { useSnackbar } from '../../../contexts/SnackbarContext'

interface LeaveSpinProps {
  modalCalled: undefined | boolean
  spin: undefined | SpinDTO
}

export function LeaveSpin({ modalCalled, spin }: LeaveSpinProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { setSnackbarStatus } = useSnackbar()
  const { spins, spinsUpdate } = useSpins()
  const navigation = useNavigation<NavigationType>()

  const onModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await leaveSpin()
      if (success) {
        navigation.navigate('HomeList')
      }
    }
    setIsVisible(false)
  }

  const leaveSpin = async () => {
    try {
      await api.post(`/spins/leave/${spin?.id}`)

      const newSpins = spins?.filter((s) => s.id !== spin?.id)

      if (newSpins !== undefined) spinsUpdate(newSpins)
      setSnackbarStatus('Saiu do rolê com sucesso', true)
      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível sair desse rolê. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  useEffect(() => {
    if (modalCalled !== undefined) {
      setIsVisible(true)
    }
  }, [modalCalled])

  return (
    <CustomModal
      text="Tem certeza que deseja sair desse rolê?"
      isVisible={isVisible}
      buttonConfirmText="Sair"
      onButtonPress={onModalPress}
    />
  )
}
