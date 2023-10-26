import { AntDesign } from '@expo/vector-icons'

import * as S from './styles'
import { NavigationType } from 'src/@types/navigation'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

export function BackButton() {
  const theme = useTheme()

  const navigation = useNavigation<NavigationType>()

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <S.BackButtonContainer
      activeOpacity={0.7}
      onPress={() => goBack()}
      underlayColor={theme.COLORS.GRAY_300}
    >
      <AntDesign name="arrowleft" size={24} color="black" />
    </S.BackButtonContainer>
  )
}
