import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { useState } from 'react'
import { Invite } from '@components/Invite'
import { NoContentText } from '@components/NoContentText'

export function Notifications() {
  const [areThereNotifications, setAreThereNotifications] = useState()

  return (
    <>
      <ScrollContainer>
        <BackButton />
        <S.Container>
          <S.Title>Notificações</S.Title>
          {areThereNotifications ? (
            <S.InvitesContainer>
              <Invite name="Bruna" type="friend" />
              <Invite name="Matheus" type="friend" />
              <Invite name="Zé" type="spin" />
            </S.InvitesContainer>
          ) : (
            <NoContentText text="Não há nenhuma notificação no momento" />
          )}
        </S.Container>
      </ScrollContainer>
    </>
  )
}
