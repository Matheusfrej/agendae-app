import AsyncStorage from '@react-native-async-storage/async-storage'

import { NOTIFICATIONS_STORAGE } from '@storage/storageConfig'
import { NotificationsDTO } from '../dtos/notificationsDTO'

export async function storageNotificationsSave(
  notifications: NotificationsDTO[],
) {
  await AsyncStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify(notifications),
  )
}

export async function storageNotificationsGet() {
  const storage = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE)

  const notifications = storage ? JSON.parse(storage) : undefined

  return notifications
}

export async function storageNotificationsRemove() {
  await AsyncStorage.removeItem(NOTIFICATIONS_STORAGE)
}
