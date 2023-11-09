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
import { convertToLocaleDate, getUserSocialName } from '@utils/format'

interface HomeListProps {
  navigation: NavigationType
}

export function HomeList({ navigation }: HomeListProps) {
  const { spins } = useSpins()
  const { user, isLogged } = useAuth()

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
            {pastSpinsOpen && spins !== undefined && isLogged && (
              <S.SpinsContainer>
                {spins.map((spin, idx) => {
                  const organizer_name =
                    spin.organizer.id !== user?.id
                      ? getUserSocialName(spin.organizer)
                      : ''

                  return (
                    <SpinCard
                      key={idx}
                      spin={spin}
                      title={spin.title}
                      creator={organizer_name}
                      start_date={convertToLocaleDate(
                        spin.start_date!,
                        spin.has_start_time,
                      )}
                      end_date={convertToLocaleDate(
                        spin.end_date!,
                        spin.has_end_time,
                      )}
                      background_color={
                        spin.theme_color as SpinCardContainerVariant
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
                  Seus <S.Span>rolês</S.Span> futuros
                </S.Title>
                <S.Subtitle>
                  os seus próximos rolês, ordenados pela data
                </S.Subtitle>
              </S.Texts>
            </S.Section>
            {allSpinsOpen && spins !== undefined && isLogged && (
              <S.SpinsContainer>
                {spins.map((spin, idx) => {
                  const organizer_name =
                    spin.organizer.id !== user?.id
                      ? getUserSocialName(spin.organizer)
                      : ''

                  return (
                    <SpinCard
                      key={idx}
                      spin={spin}
                      title={spin.title}
                      creator={organizer_name}
                      start_date={convertToLocaleDate(
                        spin.start_date!,
                        spin.has_start_time,
                      )}
                      end_date={convertToLocaleDate(
                        spin.end_date!,
                        spin.has_end_time,
                      )}
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
