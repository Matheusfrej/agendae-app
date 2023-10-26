import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { PropsStack } from 'src/@types/navigation'
import { Line } from '@components/Line'
import { ProfileImage } from '@components/ProfileImage'

interface FriendCardProps {
  name: string
}

export function FriendCard({ name }: FriendCardProps) {
  const theme = useTheme()

  const navigation = useNavigation<PropsStack>()

  return (
    <S.FriendCardContainer
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Profile')}
      underlayColor={theme.COLORS.GRAY_300}
    >
      <>
        <S.Container>
          <S.Content>
            <ProfileImage size={60} />
            <S.Section>
              <S.Texts>
                <S.Name>{name}</S.Name>
              </S.Texts>
            </S.Section>
          </S.Content>
        </S.Container>
        <Line />
      </>
    </S.FriendCardContainer>
  )
}
