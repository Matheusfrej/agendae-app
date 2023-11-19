import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAuth } from './AuthContext'
import { NotificationsDTO } from 'src/dtos/notificationsDTO'
import {
  storageNotificationsGet,
  storageNotificationsSave,
} from '@storage/storageNotifications'
import api from '../libs/api'
import { AppError } from '@utils/AppError'
import { useFriends } from './FriendsContext'
import { UserDTO } from '../dtos/userDTO'
import { getUserSocialName } from '@utils/format'

interface NotificationsContextProviderProps {
  children: ReactNode
}

interface NotificationsContextType {
  notifications: NotificationsDTO[]
  areThereNewNotifications: boolean
  onSetNotifications: (newNotifications: NotificationsDTO[]) => void
  fetchNotifications: () => Promise<void>
  acceptFriendInvite: (user: UserDTO) => Promise<boolean>
  denyFriendInvite: (user: UserDTO) => Promise<boolean>
}

export const NotificationsContext = createContext(
  {} as NotificationsContextType,
)

export function NotificationsContextProvider({
  children,
}: NotificationsContextProviderProps) {
  const { isLogged, setSnackbarStatus } = useAuth()
  const { friends, onSetFriends } = useFriends()

  const [notifications, setNotifications] = useState<NotificationsDTO[]>([])
  const [areThereNewNotifications, setAreThereNewNotifications] =
    useState<boolean>(false)

  async function notificationsUpdate(newNotifications: NotificationsDTO[]) {
    setNotifications(newNotifications)
    await storageNotificationsSave(newNotifications)
  }

  const onSetNotifications = (newNotifications: NotificationsDTO[]) => {
    setNotifications(newNotifications)
  }

  async function acceptFriendInvite(user: UserDTO) {
    try {
      await api.post(`/users/accept/${user.id}`)

      notificationsUpdate(
        notifications.filter((n) => {
          return (
            (n.type === 'friend' && n.user.id !== user.id) || n.type === 'spin'
          )
        }),
      )
      onSetFriends([...friends, user])
      setSnackbarStatus(
        `${getUserSocialName(user)} adicionado com sucesso!`,
        true,
      )

      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível aceitar o pedido de amizade. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  async function denyFriendInvite(user: UserDTO) {
    try {
      await api.post(`/users/deny/${user.id}`)

      notificationsUpdate(
        notifications.filter((n) => {
          return (
            (n.type === 'friend' && n.user.id !== user.id) || n.type === 'spin'
          )
        }),
      )

      return true
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível aceitar o pedido de amizade. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
      return false
    }
  }

  async function fetchNotifications() {
    try {
      const { data } = await api.get('/notifications')

      const notificationsInStorage = await storageNotificationsGet()
      if (
        JSON.stringify(notificationsInStorage) !==
        JSON.stringify(data.notifications)
      ) {
        setAreThereNewNotifications(true)
      } else {
        setAreThereNewNotifications(false)
      }
      notificationsUpdate(data.notifications)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível obter suas notificações. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
    }
  }

  useEffect(() => {
    if (!isLogged) {
      setNotifications([])
    } else {
      fetchNotifications()
    }
  }, [isLogged])

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        areThereNewNotifications,
        onSetNotifications,
        fetchNotifications,
        acceptFriendInvite,
        denyFriendInvite,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications(): NotificationsContextType {
  return useContext(NotificationsContext)
}
