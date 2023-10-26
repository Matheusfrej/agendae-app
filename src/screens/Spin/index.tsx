import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Line } from '@components/Line'
import { PopupMenu } from '@components/PopupMenu'
import { NavigationType } from 'src/@types/navigation'
import { useTheme } from 'styled-components'
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Participant } from '@components/Participant'
import { InviteBanner } from '@components/InviteBanner'

interface SpinProps {
  navigation: NavigationType
}

type SpinStatus = 'mine' | 'invited' | 'friend_spin'

export function Spin({ navigation }: SpinProps) {
  const [areParticipantsOpen, setAreParticipantsOpen] = useState(false)
  const [spinStatus, setSpinStatus] = useState<SpinStatus>('mine')

  const theme = useTheme()

  const description =
    'Salve galera! Decidi organizar esse grupo pois está chegando uma data muito importante pra mim agora no dia 10 de outubro, o aniversário de Naruto Uzumaki.\nCoincidentemente, também é meu aniversário nesse dia. \nPorém, como caiu numa terça, decidi fazer  no dia 15 de outubro às 19h no Parada obrigatória da Zona Norte (R. Cardeal Arcoverde, 315).'

  const spinActions = [
    {
      name: 'Editar',
      action: () => navigation.navigate('CreateUpdateSpin', { spinId: '1' }),
    },
    {
      name: 'Excluir',
      action: () => navigation.navigate('HomeList'),
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
            <S.Title>Frejversário</S.Title>
            <S.Date>Início: Domingo, 15 de outubro de 2023, 18h</S.Date>
            <S.Place>
              Parada Obrigatória Graças - R. Cardeal Arcoverde, 315
            </S.Place>
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
                <S.Date>Participantes</S.Date>
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
            <S.Description>{description}</S.Description>
          </S.Content>
        </S.Container>

        {spinStatus === 'friend_spin' && (
          <S.LeaveContainer>
            <S.Leave>Sair do rolê</S.Leave>
          </S.LeaveContainer>
        )}

        {spinStatus !== 'mine' && (
          <S.CreatedContainer>
            <S.Created>
              Criado por{' '}
              <S.CreatedTouchableText
                onPress={() => navigation.navigate('Profile')}
              >
                Matheus
              </S.CreatedTouchableText>
            </S.Created>
          </S.CreatedContainer>
        )}
      </ScrollContainer>
    </>
  )
}
