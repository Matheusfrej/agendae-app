import { Entypo } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'

export function CreateSpin() {
  const theme = useTheme()

  const navigation = useNavigation<NavigationType>()

  const goToCreateSpin = () => {
    navigation.navigate('CreateUpdateSpin', { spinId: null })
  }

  return (
    <S.CreateSpinContainer activeOpacity={0.4} onPress={() => goToCreateSpin()}>
      <Entypo name="plus" size={32} color={theme.COLORS.WHITE} />
    </S.CreateSpinContainer>
  )
}
