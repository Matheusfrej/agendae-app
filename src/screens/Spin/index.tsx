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

interface SpinProps {
  navigation: NavigationType
}

type SpinStatus = 'mine' | 'invited' | 'friend_spin'

export function Spin({ navigation }: SpinProps) {
  const route = useRoute<SpinScreenRouteProp>()
  const { user } = useAuth()

  const [areParticipantsOpen, setAreParticipantsOpen] = useState(false)
  const [spin, setSpin] = useState<SpinDTO | undefined>(route.params.spin)

  const [spinStatus] = useState<SpinStatus>(() => {
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

  const theme = useTheme()

  const spinActions = [
    {
      name: 'Editar',
      action: () => {
        if (spin) {
          navigation.navigate('CreateUpdateSpin', { spin })
        }
      },
    },
    {
      name: 'Excluir',
      action: () => toggleDeleteSpinModal(),
      color: theme.COLORS.RED,
    },
  ]

  useFocusEffect(
    useCallback(() => {
      setSpin(route.params.spin)
    }, [route.params.spin]),
  )

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
            {/* {areParticipantsOpen && (
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
            )} */}
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
