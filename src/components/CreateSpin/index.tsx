import { Entypo } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import * as S from './styles'
import { Nav } from 'src/@types/navigation'
import { useNavigation } from '@react-navigation/native'

export function CreateSpin() {
  const theme = useTheme()

  const navigation = useNavigation<Nav>()

  const goToCreateSpin = () => {
    navigation.navigate('CreateUpdateSpin')
  }

  return (
    <S.CreateSpinContainer activeOpacity={0.4} onPress={() => goToCreateSpin()}>
      <Entypo name="plus" size={32} color={theme.COLORS.WHITE} />
    </S.CreateSpinContainer>
  )
}
