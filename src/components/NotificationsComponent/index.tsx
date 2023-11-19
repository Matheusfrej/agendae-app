import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { useTheme } from 'styled-components'
import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationsContext'

export function NotificationsComponent() {
  const { isLogged } = useAuth()
  const { areThereNewNotifications } = useNotifications()

  const theme = useTheme()

  const navigation = useNavigation<NavigationType>()

  const goToNotifications = () => {
    if (!isLogged) {
      navigation.navigate('AuthStack', { screen: 'Login' })
    } else {
      navigation.navigate('Notifications')
    }
  }

  return (
    <S.NotificationContainer onPress={() => goToNotifications()}>
      {areThereNewNotifications ? (
        <FontAwesome
          name="envelope"
          size={24}
          color={theme.COLORS.PURPLE_500}
        />
      ) : (
        <FontAwesome
          name="envelope-o"
          size={24}
          color={theme.COLORS.GRAY_300}
        />
      )}
    </S.NotificationContainer>
  )
}
