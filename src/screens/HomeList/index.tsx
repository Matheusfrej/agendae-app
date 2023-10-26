import { useState } from 'react'
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { NotificationsComponent } from '@components/NotificationsComponent'
import { SpinCard, SpinCardContainerVariant } from '@components/SpinCard'
import { CreateSpin } from '@components/CreateSpin'
import { ScrollContainer } from '../../components/ScrollContainer'
import { PropsStack } from 'src/@types/navigation'

interface HomeListProps {
  navigation: PropsStack
}

export function HomeList({ navigation }: HomeListProps) {
  const [pastSpinsOpen, setPastSpinsOpen] = useState<boolean>(false)
  const [allSpinsOpen, setAllSpinsOpen] = useState<boolean>(false)
  const theme = useTheme()

  const pastSpins = [
    {
      title: 'Teste 1',
      start_date: '27/09',
      end_date: '28/09',
    },
    {
      title: 'Teste 2',
      start_date: '27/09',
      creator: 'Bruna',
      background_color: 'red',
    },
    {
      title: 'Teste 3',
      creator: 'Zé',
      background_color: 'yellow',
    },
    {
      title: 'Teste 4',
      background_color: 'green',
    },
    {
      title: 'Teste 5',
      start_date: '27/09 18h',
      end_date: '28/09 18h',
      creator: 'Bruna',
      background_color: 'purple',
    },
  ]

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
            {pastSpinsOpen && (
              <S.SpinsContainer>
                {pastSpins.map((spin, idx) => {
                  return (
                    <SpinCard
                      key={idx}
                      title={spin.title}
                      creator={spin.creator}
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
            {allSpinsOpen && (
              <S.SpinsContainer>
                {pastSpins.map((spin, idx) => {
                  return (
                    <SpinCard
                      key={idx}
                      title={spin.title}
                      creator={spin.creator}
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
          </S.Content>
        </S.Container>
      </ScrollContainer>
      <CreateSpin />
    </>
  )
}
