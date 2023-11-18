import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import { useEffect } from 'react'
import * as S from './styles'
import { FriendCard } from '@components/FriendCard'
import { NoContentText } from '@components/NoContentText'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../libs/api'
import { AppError } from '@utils/AppError'
import { useBlocked } from '../../contexts/BlockedContext'

export function Blocked() {
  const { setSnackbarStatus } = useAuth()
  const { blocked, onSetBlocked } = useBlocked()

  const areThereBlocked = blocked.length > 0

  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const response = await api.get('/blocks')

        onSetBlocked(response.data.blocks)
      } catch (error) {
        const isAppError = error instanceof AppError

        const title = isAppError
          ? error.message
          : 'Não foi possível obter os usuários bloqueados. Tente novamente mais tarde.'
        setSnackbarStatus(title, false)
      }
    }

    if (blocked.length === 0) fetchBlocked()
  }, [])

  return (
    <ScrollContainer>
      <BackButton />
      <S.Container>
        <S.Title>Bloqueados</S.Title>
        {areThereBlocked ? (
          <S.BlockedContainer>
            {blocked.map((user) => {
              return <FriendCard key={user.id} user={user} />
            })}
          </S.BlockedContainer>
        ) : (
          <NoContentText text="Nenhum usuário bloqueado no momento." />
        )}
      </S.Container>
    </ScrollContainer>
  )
}
