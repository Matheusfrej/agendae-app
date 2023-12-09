import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import { NavigationType } from 'src/@types/navigation'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { ProfileImage } from '@components/ProfileImage'
import { UserDTO } from '../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'

interface ParticipantProps {
  user: UserDTO
  invite_status: 'accepted' | 'pending' | 'denied'
}

export function Participant({ user, invite_status }: ParticipantProps) {
  const navigation = useNavigation<NavigationType>()
  const theme = useTheme()

  return (
    <S.ParticipantContainer
      onPress={() =>
        navigation.navigate('OtherProfile', {
          user,
        })
      }
    >
      <S.Div>
        <ProfileImage size={50} />
        <S.Name>{getUserSocialName(user)}</S.Name>
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
