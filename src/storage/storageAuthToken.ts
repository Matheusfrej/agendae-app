import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_STORAGE } from './storageConfig'

type StorageAuthTokenProps = {
  token: string
  refreshToken: string
}

export async function storageAuthTokenSave(
  token: string,
  refreshToken: string,
) {
  await AsyncStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({ token, refreshToken }),
  )
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE)

  const { token, refreshToken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : undefined

  return { token, refreshToken }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
