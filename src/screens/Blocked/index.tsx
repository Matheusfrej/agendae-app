import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import { useState } from 'react'
import * as S from './styles'
import { FriendCard } from '@components/FriendCard'
import { NoContentText } from '@components/NoContentText'

export function Blocked() {
  const [areThereBlocked, setAreThereBlocked] = useState(false)

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <S.Title>Bloqueados</S.Title>
        {areThereBlocked ? (
          <S.BlockedContainer>
            <FriendCard name="Bruna" />
            <FriendCard name="Matheus" />
            <FriendCard name="Zé" />
          </S.BlockedContainer>
        ) : (
          <NoContentText text="Nenhum usuário bloquado no momento." />
        )}
      </S.Container>
    </ScrollContainer>
  )
}
