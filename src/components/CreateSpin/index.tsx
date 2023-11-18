import { Entypo } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { useAuth } from '../../contexts/AuthContext'

export function CreateSpin() {
  const theme = useTheme()
  const { isLogged } = useAuth()

  const navigation = useNavigation<NavigationType>()

  const goToCreateSpin = () => {
    if (!isLogged) {
      navigation.navigate('AuthStack', { screen: 'Login' })
    } else {
      navigation.navigate('CreateUpdateSpin')
    }
  }

  return (
    <S.CreateSpinContainer activeOpacity={0.4} onPress={() => goToCreateSpin()}>
      <Entypo name="plus" size={32} color={theme.COLORS.WHITE} />
    </S.CreateSpinContainer>
  )
}
