import { Entypo } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import * as S from './styles'

export function CreateSpin() {
  const theme = useTheme()

  return (
    <S.CreateSpinContainer activeOpacity={0.4}>
      <Entypo name="plus" size={32} color={theme.COLORS.WHITE} />
    </S.CreateSpinContainer>
  )
}
