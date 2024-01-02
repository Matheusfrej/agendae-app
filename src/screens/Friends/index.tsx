import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { NavigationType } from 'src/@types/navigation'
import { FriendCard } from '@components/FriendCard'
import { NoContentText } from '@components/NoContentText'
import { useSwipe } from '../../hooks/useSwipe'
import { useFriends } from '../../contexts/FriendsContext'

interface FriendsProps {
  navigation: NavigationType
}

export function Friends({ navigation }: FriendsProps) {
  const { friends } = useFriends()

  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeRight,
    rangeOffset: 6,
  })

  function onSwipeRight() {
    navigation.navigate('Profile')
  }

  const areThereFriends = friends.length > 0

  return (
    <>
      <ScrollContainer>
        <S.AddFriendButtonContainer>
          <CustomButton
            text="Adicionar amigo"
            variant="accept"
            fontSize={20}
            onPress={() => navigation.navigate('AddFriend')}
          />
        </S.AddFriendButtonContainer>
        <S.Container onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <S.NavigationContainer>
            <S.ProfileNavigationContainer
              variant="black"
              onPress={() => navigation.navigate('Profile')}
            >
              <S.Title variant="black">Perfil</S.Title>
            </S.ProfileNavigationContainer>
            <S.ProfileNavigationContainer
              variant="purple"
              onPress={() => navigation.navigate('Friends')}
            >
              <S.Title variant="purple">Amigos</S.Title>
            </S.ProfileNavigationContainer>
          </S.NavigationContainer>
          {areThereFriends ? (
            <S.FriendsContainer>
              {friends.map((friend) => {
                return <FriendCard key={friend.id} user={friend} />
              })}
            </S.FriendsContainer>
          ) : (
            <NoContentText text="Você ainda não tem nenhum amigo adicionado." />
          )}
        </S.Container>
      </ScrollContainer>
    </>
  )
}
