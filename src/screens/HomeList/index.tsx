import { useState } from 'react'
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { NotificationsComponent } from '@components/NotificationsComponent'
import { SpinCard, SpinCardContainerVariant } from '@components/SpinCard'
import { CreateSpin } from '@components/CreateSpin'
import { ScrollContainer } from '../../components/ScrollContainer'
import { NavigationType } from 'src/@types/navigation'
import { useSpins } from '../../contexts/SpinsContext'
import { useAuth } from '../../contexts/AuthContext'

interface HomeListProps {
  navigation: NavigationType
}

export function HomeList({ navigation }: HomeListProps) {
  const { spins } = useSpins()
  const { user } = useAuth()

  const [pastSpinsOpen, setPastSpinsOpen] = useState<boolean>(false)
  const [allSpinsOpen, setAllSpinsOpen] = useState<boolean>(false)
  const [id, setId] = useState('')
  const theme = useTheme()

  return (
    <>
      <ScrollContainer>
        <S.Container>
          <NotificationsComponent />
          <S.Content>
            <S.Section onPress={() => setPastSpinsOpen(!pastSpinsOpen)}>
              {!pastSpinsOpen ? (
                <MaterialIcons
                  name="arrow-right"
                  size={32}
                  color={theme.COLORS.PURPLE_500}
                />
              ) : (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={32}
                  color={theme.COLORS.PURPLE_500}
                />
              )}
              <S.Texts>
                <S.Title>
                  <S.Span>Rolês</S.Span> anteriores
                </S.Title>
                <S.Subtitle>rolês que já terminaram</S.Subtitle>
              </S.Texts>
            </S.Section>
            {pastSpinsOpen && spins !== undefined && (
              <S.SpinsContainer>
                {spins.map((spin, idx) => {
                  const organizer_name =
                    spin.organizer.id !== user.id
                      ? spin.organizer.nickname ||
                        spin.organizer.name.split(' ')[0]
                      : ''

                  return (
                    <SpinCard
                      key={idx}
                      title={spin.title}
                      creator={organizer_name}
                      start_date={spin.start_date}
                      end_date={spin.end_date}
                      background_color={
                        spin.background_color as SpinCardContainerVariant
                      }
                    />
                  )
                })}
              </S.SpinsContainer>
            )}
            <S.Section onPress={() => setAllSpinsOpen(!allSpinsOpen)}>
              {!allSpinsOpen ? (
                <MaterialIcons
                  name="arrow-right"
                  size={32}
                  color={theme.COLORS.PURPLE_500}
                />
              ) : (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={32}
                  color={theme.COLORS.PURPLE_500}
                />
              )}
              <S.Texts>
                <S.Title>
                  Todos os seus <S.Span>rolês</S.Span>
                </S.Title>
                <S.Subtitle>
                  todos os seus rolês, ordenados pela data
                </S.Subtitle>
              </S.Texts>
            </S.Section>
            {allSpinsOpen && spins !== undefined && (
              <S.SpinsContainer>
                {spins.map((spin, idx) => {
                  const organizer_name =
                    spin.organizer.id !== user.id
                      ? spin.organizer.nickname ||
                        spin.organizer.name.split(' ')[0]
                      : ''

                  return (
                    <SpinCard
                      key={idx}
                      title={spin.title}
                      creator={organizer_name}
                      start_date={spin.start_date}
                      end_date={spin.end_date}
                      background_color={
                        spin.theme_color as SpinCardContainerVariant
                      }
                    />
                  )
                })}
              </S.SpinsContainer>
            )}
          </S.Content>
        </S.Container>
      </ScrollContainer>
      <CreateSpin />
    </>
  )
}
