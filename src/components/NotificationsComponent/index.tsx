import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { useTheme } from 'styled-components'
import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { Nav } from 'src/@types/navigation'

export function NotificationsComponent() {
  const [hasNotifications, setHasNotifications] = useState<boolean>(true)
  const theme = useTheme()

  const navigation = useNavigation<Nav>()

  const goToNotifications = () => {
    setHasNotifications(!hasNotifications)
    navigation.navigate('Notifications')
  }

  return (
    <S.NotificationContainer onPress={() => goToNotifications()}>
      {hasNotifications ? (
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
