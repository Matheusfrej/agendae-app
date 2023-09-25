import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { useTheme } from 'styled-components'
import * as S from './styles'

export function Notifications() {
  const [hasNotifications, setHasNotifications] = useState<boolean>(true)
  const theme = useTheme()

  return (
    <S.NotificationContainer
      onPress={() => setHasNotifications(!hasNotifications)}
    >
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
