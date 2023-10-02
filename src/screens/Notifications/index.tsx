import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../theme/global'

import * as S from './styles'
import { Invite } from '@components/Invite'

export function Notifications() {
  return (
    <>
      <BackButton />
      <ScrollContainer>
        <S.Container>
          <S.Title>Notificações</S.Title>
          <S.InvitesContainer>
            <Invite name="Bruna" type="friend" />
            <Invite name="Matheus" type="friend" />
            <Invite name="Zé" type="spin" />
          </S.InvitesContainer>
        </S.Container>
      </ScrollContainer>
    </>
  )
}
