import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Line } from '@components/Line'
import { PopupMenu } from '@components/PopupMenu'
import { NavigationType, SpinScreenRouteProp } from 'src/@types/navigation'
import { useTheme } from 'styled-components'
import { useState, useCallback } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Participant } from '@components/Participant'
import { InviteBanner } from '@components/InviteBanner'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { SpinDTO } from '../../dtos/spinDTO'
import { getUserSocialName, convertToLocaleDate } from '@utils/format'
import { useAuth } from '../../contexts/AuthContext'
import { LeaveSpin } from './LeaveSpin'
import { DeleteSpin } from './DeleteSpin'
import { UserDTO } from '../../dtos/userDTO'
import api from '../../libs/api'
import { AppError } from '@utils/AppError'

interface SpinProps {
  navigation: NavigationType
}

type ParticipantType = {
  spinId: string
  status: 0 | 1 | 2
  received: UserDTO
}

type SpinStatus = 'mine' | 'invited' | 'friend_spin' | 'user_spin'

export function Spin({ navigation }: SpinProps) {
  const route = useRoute<SpinScreenRouteProp>()
  const { user, setSnackbarStatus } = useAuth()

  const [areParticipantsOpen, setAreParticipantsOpen] = useState(false)
  const [spin, setSpin] = useState<SpinDTO | undefined>(route.params.spin)
  const [participants, setParticipants] = useState<ParticipantType[]>([])

  const participantsPendingOrAccepted = participants
    .filter((p) => p.status !== 2)
    .map((p) => p.received)

  const [spinStatus, setSpinStatus] = useState<SpinStatus>(() => {
    if (route.params.isSpinRequest) {
      return 'invited'
    }
    if (user?.id !== route.params.spin.organizer.id) {
      return 'friend_spin'
    }
    return 'mine'
  })
  const [isLeaveSpinModalVisible, setIsLeaveSpinModalVisible] = useState<
    undefined | boolean
  >()

  const [isDeleteSpinModalVisible, setIsDeleteSpinModalVisible] =
    useState<boolean>()

  const toggleLeaveSpinModal = () => {
    if (isLeaveSpinModalVisible === undefined) {
      setIsLeaveSpinModalVisible(true)
    } else {
      setIsLeaveSpinModalVisible((state) => !state)
    }
  }

  const toggleDeleteSpinModal = () => {
    if (isDeleteSpinModalVisible === undefined) {
      setIsDeleteSpinModalVisible(true)
    } else {
      setIsDeleteSpinModalVisible((state) => !state)
    }
  }

  const userAcceptedInvite = () => {
    setSpinStatus('friend_spin')
  }

  const userDeniedInvite = () => {
    setSpinStatus('user_spin')
  }

  const theme = useTheme()

  const spinActions = [
    {
      name: 'Editar',
      action: () => {
        if (spin) {
          navigation.navigate('CreateUpdateSpin', {
            spin,
            participants: participantsPendingOrAccepted,
          })
        }
      },
    },
    {
      name: 'Excluir',
      action: () => toggleDeleteSpinModal(),
      color: theme.COLORS.RED,
    },
  ]

  const fetchParticipants = async () => {
    try {
      const response = await api.get(
        `/spins/participants/${route.params.spin.id}`,
      )

      setParticipants(response.data.participants)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os participantes. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setSpin(route.params.spin)
      fetchParticipants()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params.spin]),
  )

  return (
    <>
      <ScrollContainer>
        <BackButton />
        {spinStatus === 'mine' && <PopupMenu actions={spinActions} />}
        <S.Container>
          {spinStatus === 'invited' && (
            <InviteBanner
              type="spin"
              spin={spin}
              accepted={() => userAcceptedInvite()}
              denied={() => userDeniedInvite()}
            />
          )}
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
            {spin?.place && <S.Place>{spin?.place}</S.Place>}
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
                {participants.length > 0 ? (
                  participants.map((participant) => {
                    return (
                      <Participant
                        key={participant.spinId + participant.received.id}
                        user={participant.received}
                        invite_status={
                          participant.status === 0
                            ? 'pending'
                            : participant.status === 1
                            ? 'accepted'
                            : 'denied'
                        }
                      />
                    )
                  })
                ) : (
                  <S.Content>
                    <S.NoParticipantsText>
                      Ainda não há nenhum participante convidado
                    </S.NoParticipantsText>
                  </S.Content>
                )}
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
                    navigation.navigate('OtherProfile', {
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
        <LeaveSpin modalCalled={isLeaveSpinModalVisible} spin={spin} />
        <DeleteSpin modalCalled={isDeleteSpinModalVisible} spin={spin} />
      </ScrollContainer>
    </>
  )
}
