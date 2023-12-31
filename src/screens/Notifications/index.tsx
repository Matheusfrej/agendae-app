import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Invite } from '@components/Invite'
import { NoContentText } from '@components/NoContentText'
import { useNotifications } from '../../contexts/NotificationsContext'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

export function Notifications() {
  const { fetchNotifications, notifications } = useNotifications()

  useFocusEffect(
    useCallback(() => {
      fetchNotifications()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return (
    <>
      <ScrollContainer>
        <BackButton />
        <S.Container>
          <S.Title>Notificações</S.Title>
          {notifications.length > 0 ? (
            <S.InvitesContainer>
              {notifications.map((notification) => {
                if (notification.type === 'friend') {
                  return (
                    <Invite
                      key={notification.user.id + notification.type}
                      user={notification.user}
                      type={notification.type}
                    />
                  )
                } else {
                  return (
                    <Invite
                      key={
                        notification.spin.organizer.id +
                        notification.type +
                        notification.spin.id
                      }
                      user={notification.spin.organizer}
                      spin={notification.spin}
                      type={notification.type}
                    />
                  )
                }
              })}
            </S.InvitesContainer>
          ) : (
            <NoContentText text="Não há nenhuma notificação no momento" />
          )}
        </S.Container>
      </ScrollContainer>
    </>
  )
}
