import { useNavigation } from '@react-navigation/native'
import * as S from './styles'
import { NavigationType } from 'src/@types/navigation'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { ProfileImage } from '@components/ProfileImage'
import { UserDTO } from '../../dtos/userDTO'
import { getUserSocialName } from '@utils/format'
import { useAuth } from '../../../src/contexts/AuthContext'

interface ParticipantProps {
  currUser: UserDTO
  invite_status: 'accepted' | 'pending' | 'denied'
}

export function Participant({ currUser, invite_status }: ParticipantProps) {
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()
  const theme = useTheme()

  return (
    <S.ParticipantContainer
      onPress={() => {
        if (user?.id === currUser.id) {
          return navigation.navigate('ProfileStack', {
            screen: 'Profile',
            params: { user: currUser },
          })
        }
        return navigation.navigate('OtherProfile', {
          user: currUser,
        })
      }}
    >
      <S.Div>
        <ProfileImage size={50} />
        <S.Name>{getUserSocialName(currUser)}</S.Name>
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
