import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import * as S from './styles'

export function Loading() {
  const theme = useTheme()

  return (
    <S.LoadingContainer>
      <ActivityIndicator size={'large'} color={theme.COLORS.PURPLE_500} />
    </S.LoadingContainer>
  )
}
