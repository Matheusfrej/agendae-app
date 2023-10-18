import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import { PropsStack } from 'src/@types/navigation'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

interface ParticipantProps {
  id: string
  name: string
  invite_status: 'accepted' | 'pending' | 'denied'
}

export function Participant({ name, invite_status }: ParticipantProps) {
  const navigation = useNavigation<PropsStack>()
  const theme = useTheme()

  return (
    <S.ParticipantContainer onPress={() => navigation.navigate('Profile')}>
      <S.Div>
        <S.ProfileImage></S.ProfileImage>
        <S.Name>{name}</S.Name>
      </S.Div>
      {invite_status === 'accepted' && (
        <AntDesign name="check" size={24} color={theme.COLORS.BLUE} />
      )}
      {invite_status === 'pending' && (
        <AntDesign
          name="clockcircleo"
          size={24}
          color={theme.COLORS.GRAY_700}
        />
      )}
      {invite_status === 'denied' && (
        <Feather name="x" size={24} color={theme.COLORS.RED} />
      )}
    </S.ParticipantContainer>
  )
}
