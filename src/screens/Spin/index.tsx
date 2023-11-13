import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Line } from '@components/Line'
import { PopupMenu } from '@components/PopupMenu'
import { NavigationType, SpinScreenRouteProp } from 'src/@types/navigation'
import { useTheme } from 'styled-components'
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Participant } from '@components/Participant'
import { InviteBanner } from '@components/InviteBanner'
import { useRoute } from '@react-navigation/native'
import { SpinDTO } from '../../dtos/spinDTO'
import { getUserSocialName, convertToLocaleDate } from '@utils/format'
import { useAuth } from '../../contexts/AuthContext'
import { CustomModal } from '@components/CustomModal'
import api from '../../libs/api'
import { AppError } from '@utils/AppError'
import { useSpins } from '../../contexts/SpinsContext'

interface SpinProps {
  navigation: NavigationType
}

type SpinStatus = 'mine' | 'invited' | 'friend_spin'

export function Spin({ navigation }: SpinProps) {
  const route = useRoute<SpinScreenRouteProp>()
  const { user, setSnackbarStatus } = useAuth()
  const { spins, spinsUpdate } = useSpins()

  const [areParticipantsOpen, setAreParticipantsOpen] = useState(false)
  const [spin] = useState<SpinDTO | undefined>(route.params.spin)
  const [spinStatus] = useState<SpinStatus>(() => {
    if (user?.id !== route.params.spin.organizer.id) {
      return 'friend_spin'
    }
    return 'mine'
  })
  const [isLeaveSpinModalVisible, setIsLeaveSpinModalVisible] =
    useState<boolean>(false)

  const [isDeleteSpinModalVisible, setIsDeleteSpinModalVisible] =
    useState<boolean>(false)

  const toggleLeaveSpinModal = () => {
    setIsLeaveSpinModalVisible(true)
  }

  const toggleDeleteSpinModal = () => {
    setIsDeleteSpinModalVisible(true)
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

  const onLeaveSpinModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await leaveSpin()
      if (success) {
        navigation.navigate('HomeList')
      }
    }
    setIsLeaveSpinModalVisible(false)
  }

  const onDeleteSpinModalPress = async (confirm: boolean) => {
    if (confirm) {
      const success = await deleteSpin()
      if (success) {
        navigation.navigate('HomeList')
      }
    }
    setIsDeleteSpinModalVisible(false)
  }

  const theme = useTheme()

  const spinActions = [
    {
      name: 'Editar',
      action: () => navigation.navigate('CreateUpdateSpin'),
    },
    {
      name: 'Excluir',
      action: () => toggleDeleteSpinModal(),
      color: theme.COLORS.RED,
    },
  ]

  return (
    <>
      <ScrollContainer>
        <BackButton />
        {spinStatus === 'mine' && <PopupMenu actions={spinActions} />}
        <S.Container>
          {spinStatus === 'invited' && <InviteBanner type="spin" />}
          <S.HeaderTitle invited={spinStatus === 'invited'}>rolê</S.HeaderTitle>
          <S.Content>
            <S.Title>{spin?.title}</S.Title>
            {spin?.start_date && (
              <S.Date>
                Início:{' '}
                {convertToLocaleDate(spin.start_date, spin.has_start_time)}
              </S.Date>
            )}
            {spin?.end_date && (
              <S.Date>
                Fim: {convertToLocaleDate(spin.end_date, spin.has_end_time)}
              </S.Date>
            )}
            <S.Place>{spin?.place}</S.Place>
            <S.Section
              onPress={() => setAreParticipantsOpen(!areParticipantsOpen)}
            >
              {!areParticipantsOpen ? (
                <MaterialIcons
                  name="arrow-right"
                  size={32}
                  color={theme.COLORS.PURPLE_500}
                />
              ) : (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={32}
                  color={theme.COLORS.PURPLE_500}
                />
              )}

              <S.Content>
                <S.ParticipantsText>Participantes</S.ParticipantsText>
              </S.Content>
            </S.Section>
            {areParticipantsOpen && (
              <S.ParticipantsContainer>
                <Participant
                  id="1"
                  name="Bruna"
                  invite_status="accepted"
                ></Participant>
                <Participant
                  id="2"
                  name="Matheus"
                  invite_status="denied"
                ></Participant>
                <Participant
                  id="3"
                  name="Zé"
                  invite_status="pending"
                ></Participant>
              </S.ParticipantsContainer>
            )}
            <Line />
            <S.Description>{spin?.description}</S.Description>
          </S.Content>
        </S.Container>
        <S.Footer>
          {spinStatus === 'friend_spin' && (
            <S.LeaveContainer onPress={() => toggleLeaveSpinModal()}>
              <S.Leave>Sair do rolê</S.Leave>
            </S.LeaveContainer>
          )}

          {spinStatus !== 'mine' && spin && (
            <S.CreatedContainer>
              <S.Created>
                Criado por{' '}
                <S.CreatedTouchableText
                  onPress={() =>
                    navigation.navigate('Profile', {
                      user: spin.organizer,
                    })
                  }
                >
                  {getUserSocialName(spin.organizer)}
                </S.CreatedTouchableText>
              </S.Created>
            </S.CreatedContainer>
          )}
        </S.Footer>
        <CustomModal
          text="Tem certeza que deseja sair desse rolê?"
          isVisible={isLeaveSpinModalVisible}
          buttonConfirmText="Sair"
          onButtonPress={onLeaveSpinModalPress}
        />
        <CustomModal
          text="Tem certeza que deseja excluir esse rolê?"
          isVisible={isDeleteSpinModalVisible}
          buttonConfirmText="Excluir"
          onButtonPress={onDeleteSpinModalPress}
        />
      </ScrollContainer>
    </>
  )
}
