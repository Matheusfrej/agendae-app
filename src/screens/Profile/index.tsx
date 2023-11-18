import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { NavigationType, ProfileScreenRouteProp } from 'src/@types/navigation'
import { useEffect, useState, useCallback } from 'react'
import { PopupMenu } from '@components/PopupMenu'
import { useTheme } from 'styled-components'
import { ProfileImage } from '@components/ProfileImage'
import { BackButton } from '@components/BackButton'
import { InviteBanner } from '@components/InviteBanner'
import { useSwipe } from '../../hooks/useSwipe'
import { Logo } from '@components/Logo'
import api from '../../libs/api'
import { useAuth } from '../../contexts/AuthContext'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { UserDTO } from 'src/dtos/userDTO'
import { Unfriend } from './Unfriend'
import { StatisticsDTO } from '../../dtos/statisticsDTO'
import { getUserSocialName } from '@utils/format'
import { Unblock } from './Unblock'

interface ProfileProps {
  navigation: NavigationType
}

type ProfileStatus =
  | 'mine'
  | 'friend'
  | 'user'
  | 'friend_request'
  | 'you_blocked_user'
  | 'user_blocked_you'

export function Profile({ navigation }: ProfileProps) {
  const { user, isLogged, signOut, setSnackbarStatus } = useAuth()
  const route = useRoute<ProfileScreenRouteProp>()

  const [profileStatus, setProfileStatus] = useState<ProfileStatus>(() => {
    if (route.params?.user) {
      return 'friend'
    }
    return 'mine'
  })
  const [currUserStatistics, setCurrUserStatistics] = useState<
    undefined | StatisticsDTO
  >()
  const [currUser, setCurrUser] = useState<UserDTO | undefined>(() => {
    if (user) {
      return user
    } else if (route.params?.user) {
      return route.params.user
    }
  })
  const [triggerUnfriendModal, setTriggerUnfriendModal] = useState<
    undefined | boolean
  >()
  const [triggerUnblockModal, setTriggerUnblockModal] = useState<
    undefined | boolean
  >()
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

  async function getProfile(user_id: string) {
    try {
      const profileResponse = await api.get(`/users/${user_id}`)

      const isMine = profileResponse.data.user.id === user?.id

      setCurrUserStatistics(profileResponse.data.statistics)

      if (!isMine) {
        if (profileResponse.data.is_friend) {
          setProfileStatus('friend')
        } else if (route.params?.isFriendRequest) {
          setProfileStatus('friend_request')
        } else if (profileResponse.data.is_blocked_by_you) {
          setProfileStatus('you_blocked_user')
        } else if (profileResponse.data.user_blocked_you) {
          setProfileStatus('user_blocked_you')
        } else {
          setProfileStatus('user')
        }
      }
      setCurrUser(profileResponse.data.user)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      setSnackbarStatus(title, false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (route.params?.user) {
        setProfileStatus('friend')
        getProfile(route.params.user.id)
        setCurrUser(route.params?.user)
      } else if (user) {
        setProfileStatus('mine')
        setCurrUser(user)
      }
    }, [route.params?.user, user]),
  )

  useEffect(() => {
    if (isLogged && user && !route.params?.user) getProfile(user.id)
  }, [isLogged])

  return (
    <>
      {!isLogged || !currUserStatistics ? (
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
                onPress={() =>
                  navigation.navigate('AuthStack', { screen: 'Login' })
                }
              />
              <CustomButton
                text="Cadastrar"
                variant="default"
                onPress={() =>
                  navigation.navigate('AuthStack', { screen: 'Register' })
                }
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
                {currUser?.name}{' '}
                {currUser?.nickname && <S.Bold>({currUser?.nickname})</S.Bold>}
              </S.Text>
            </S.ProfileImageAndName>
            {profileStatus !== 'user_blocked_you' ? (
              <S.StatisticsContainer>
                <S.Statistic>
                  <S.Text variant="purple">
                    {currUserStatistics.previous_spins}
                  </S.Text>
                  <S.Text fontSize={18}>rolês passados</S.Text>
                </S.Statistic>
                <S.Statistic>
                  <S.Text variant="purple">
                    {currUserStatistics.invited_spins}
                  </S.Text>
                  <S.Text fontSize={18}>rolês convidados</S.Text>
                </S.Statistic>
                <S.Statistic>
                  <S.Text variant="purple">
                    {currUserStatistics.total_spins}
                  </S.Text>
                  <S.Text fontSize={18}>rolês organizados</S.Text>
                </S.Statistic>
              </S.StatisticsContainer>
            ) : (
              <S.BlockedContainer>
                <S.Text fontSize={20}>Você está bloqueado</S.Text>
                <S.BlockedSubtitle>{`Você está impedido de adicionar ou ver o perfil de ${
                  currUser && getUserSocialName(currUser)
                }.`}</S.BlockedSubtitle>
              </S.BlockedContainer>
            )}
          </S.Container>
          {profileStatus !== 'mine' && (
            <S.FooterTextContainer>
              {profileStatus === 'friend' && (
                <S.FooterTextTouchable
                  onPress={() => {
                    if (triggerUnfriendModal === undefined) {
                      setTriggerUnfriendModal(true)
                    } else {
                      setTriggerUnfriendModal((state) => !state)
                    }
                  }}
                >
                  <S.FooterText>Desfazer amizade</S.FooterText>
                </S.FooterTextTouchable>
              )}
              {profileStatus === 'you_blocked_user' && (
                <S.FooterTextTouchable
                  onPress={() => {
                    if (triggerUnblockModal === undefined) {
                      setTriggerUnblockModal(true)
                    } else {
                      setTriggerUnblockModal((state) => !state)
                    }
                  }}
                >
                  <S.FooterText>Desbloquear usuário</S.FooterText>
                </S.FooterTextTouchable>
              )}
              {profileStatus !== 'user_blocked_you' &&
                profileStatus !== 'you_blocked_user' && (
                  <S.FooterTextTouchable>
                    <S.FooterText>Bloquear usuário</S.FooterText>
                  </S.FooterTextTouchable>
                )}
            </S.FooterTextContainer>
          )}
          <Unfriend modalCalled={triggerUnfriendModal} friend={currUser} />
          <Unblock modalCalled={triggerUnblockModal} user_blocked={currUser} />
        </ScrollContainer>
      )}
    </>
  )
}
