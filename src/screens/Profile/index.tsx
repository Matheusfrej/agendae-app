import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { NavigationType, ProfileScreenRouteProp } from 'src/@types/navigation'
import { useEffect, useState } from 'react'
import { PopupMenu } from '@components/PopupMenu'
import { useTheme } from 'styled-components'
import { ProfileImage } from '@components/ProfileImage'
import { BackButton } from '@components/BackButton'
import { InviteBanner } from '@components/InviteBanner'
import { useSwipe } from '../../hooks/useSwipe'
import { Logo } from '@components/Logo'
import api from '../../libs/api'
import { useAuth } from '../../contexts/AuthContext'
import { useRoute } from '@react-navigation/native'

interface ProfileProps {
  navigation: NavigationType
}

type ProfileStatus = 'mine' | 'friend' | 'user' | 'friend_request'

export function Profile({ navigation }: ProfileProps) {
  const { user, signOut } = useAuth()
  const route = useRoute<ProfileScreenRouteProp>()

  const isLogged = user !== undefined

  const [profileStatus, setProfileStatus] = useState<ProfileStatus>('mine')
  const [userStatistics, setUserStatistics] = useState<any>()
  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeLeft,
    rangeOffset: 6,
  })

  const theme = useTheme()

  const profileActions = [
    {
      name: 'Editar perfil',
      action: () => navigation.navigate('EditProfile'),
    },
    {
      name: 'Ver bloqueados',
      action: () => navigation.navigate('Blocked'),
    },
    {
      name: 'Sair',
      action: () => {
        signOut()
        navigation.navigate('HomeList')
      },
      color: theme.COLORS.RED,
    },
  ]

  function onSwipeLeft() {
    if (profileStatus === 'mine') {
      navigation.navigate('Friends')
    }
  }

  async function getProfile(user_id: any) {
    try {
      const profileResponse = await api.get(`/users/${user_id}`)

      const isMine = profileResponse.data.user.id === user.id

      setUserStatistics(profileResponse.data.statistics)
      if (!isMine) {
        if (profileResponse.data.is_friend) {
          setProfileStatus('friend')
        } else if (route.params?.isFriendRequest) {
          setProfileStatus('friend_request')
        } else {
          setProfileStatus('user')
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (route.params) {
      getProfile(route.params.userId)
    } else if (isLogged) {
      getProfile(user.id)
    }
  }, [])

  return (
    <>
      {!isLogged ? (
        <ScrollContainer>
          <S.NotLoggedContainer>
            <Logo style={{ marginBottom: 50 }} />
            <S.Subtitle>
              Você precisa ter uma conta para ver o seu perfil
            </S.Subtitle>
            <S.Buttons>
              <CustomButton
                text="Login"
                variant="default"
                onPress={() => navigation.navigate('Login')}
              />
              <CustomButton
                text="Cadastrar"
                variant="default"
                onPress={() => navigation.navigate('Register')}
              />
            </S.Buttons>
          </S.NotLoggedContainer>
        </ScrollContainer>
      ) : (
        <ScrollContainer>
          {profileStatus !== 'mine' && <BackButton />}
          {profileStatus === 'mine' && <PopupMenu actions={profileActions} />}
          {profileStatus === 'user' && (
            <S.AddFriendButtonContainer>
              <CustomButton
                text="Adicionar"
                variant="accept"
                fontSize={20}
                onPress={() => navigation.navigate('AddFriend')}
              />
            </S.AddFriendButtonContainer>
          )}

          <S.Container onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {profileStatus === 'friend_request' && <InviteBanner type="spin" />}

            {profileStatus === 'mine' && (
              <S.NavigationContainer>
                <S.ProfileNavigationContainer
                  variant="purple"
                  onPress={() => navigation.navigate('Profile')}
                >
                  <S.Title variant="purple">Perfil</S.Title>
                </S.ProfileNavigationContainer>
                <S.ProfileNavigationContainer
                  variant="black"
                  onPress={() => navigation.navigate('Friends')}
                >
                  <S.Title variant="black">Amigos</S.Title>
                </S.ProfileNavigationContainer>
              </S.NavigationContainer>
            )}
            <S.ProfileImageAndName>
              <ProfileImage size={100} />
              <S.Text>
                Matheus Frej <S.Bold>(Frej)</S.Bold>
              </S.Text>
            </S.ProfileImageAndName>
            <S.StatisticsContainer>
              <S.Statistic>
                <S.Text variant="purple">8</S.Text>
                <S.Text fontSize={18}>rolês passados</S.Text>
              </S.Statistic>
              <S.Statistic>
                <S.Text variant="purple">3</S.Text>
                <S.Text fontSize={18}>rolês convidados</S.Text>
              </S.Statistic>
              <S.Statistic>
                <S.Text variant="purple">20</S.Text>
                <S.Text fontSize={18}>rolês organizados</S.Text>
              </S.Statistic>
            </S.StatisticsContainer>
          </S.Container>
          {profileStatus !== 'mine' && (
            <S.FooterTextContainer>
              {profileStatus === 'friend' && (
                <S.FooterTextTouchable>
                  <S.FooterText>Desfazer amizade</S.FooterText>
                </S.FooterTextTouchable>
              )}
              <S.FooterTextTouchable>
                <S.FooterText>Bloquear usuário</S.FooterText>
              </S.FooterTextTouchable>
            </S.FooterTextContainer>
          )}
        </ScrollContainer>
      )}
    </>
  )
}
