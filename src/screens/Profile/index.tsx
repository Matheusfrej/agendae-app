import { CustomButton } from '@components/CustomButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { PropsStack } from 'src/@types/navigation'
import { useState } from 'react'
import { PopupMenu } from '@components/PopupMenu'
import { useTheme } from 'styled-components'
import { ProfileImage } from '@components/ProfileImage'

interface ProfileProps {
  navigation: PropsStack
}

export function Profile({ navigation }: ProfileProps) {
  const [isLogged] = useState(true)
  const theme = useTheme()

  const profileActions = [
    {
      name: 'Editar perfil',
      action: () => navigation.navigate('Profile'),
    },
    {
      name: 'Ver bloqueados',
      action: () => navigation.navigate('Profile'),
    },
    {
      name: 'Sair',
      action: () => navigation.navigate('HomeList'),
      color: theme.COLORS.RED,
    },
  ]

  return (
    <>
      {!isLogged ? (
        <ScrollContainer>
          <S.Container>
            <S.TitleNotLogged>Ops...</S.TitleNotLogged>
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
          </S.Container>
        </ScrollContainer>
      ) : (
        <ScrollContainer>
          <PopupMenu actions={profileActions} />
          <S.Container>
            <S.NavigationContainer>
              <S.ProfileNavigationContainer variant="purple">
                <S.Title variant="purple">Perfil</S.Title>
              </S.ProfileNavigationContainer>
              <S.ProfileNavigationContainer variant="black">
                <S.Title variant="black">Amigos</S.Title>
              </S.ProfileNavigationContainer>
            </S.NavigationContainer>
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
        </ScrollContainer>
      )}
    </>
  )
}
