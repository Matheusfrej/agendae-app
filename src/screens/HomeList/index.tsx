import { useState } from 'react'
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { NotificationsComponent } from '@components/NotificationsComponent'
import { SpinCard } from '@components/SpinCard'
import { ColorOptionsType } from '../../@types/types'
import { CreateSpin } from '@components/CreateSpin'
import { ScrollContainer } from '../../components/ScrollContainer'
import { useSpins } from '../../contexts/SpinsContext'
import { useAuth } from '../../contexts/AuthContext'
import { convertToLocaleDate, getUserSocialName } from '@utils/format'
import { SpinDTO } from '../../dtos/spinDTO'

export function HomeList() {
  const { spins } = useSpins()
  const { user, isLogged } = useAuth()

  const [pastSpinsOpen, setPastSpinsOpen] = useState<boolean>(false)
  const [allSpinsOpen, setAllSpinsOpen] = useState<boolean>(false)
  const theme = useTheme()

  const pastSpins: SpinDTO[] = []
  const nextSpins: SpinDTO[] = []
  const currDate = new Date()
  spins?.forEach((spin) => {
    if (
      (spin.start_date &&
        new Date(spin.start_date) < currDate &&
        !spin.end_date) ||
      (spin.end_date &&
        new Date(spin.end_date) < currDate &&
        !spin.start_date) ||
      (spin.end_date &&
        spin.start_date &&
        new Date(spin.end_date) < currDate &&
        new Date(spin.start_date) < currDate)
    ) {
      pastSpins.push(spin)
    } else {
      nextSpins.push(spin)
    }
  })

  const max = (a: number, b: number) => {
    if (a < b) {
      return b
    }
    return a
  }

  const sortByDate = (a: SpinDTO, b: SpinDTO) => {
    const dateA = max(
      new Date(a.start_date || 0).getTime(),
      new Date(a.end_date || 0).getTime(),
    )
    const dateB = max(
      new Date(b.start_date || 0).getTime(),
      new Date(b.end_date || 0).getTime(),
    )

    if (!dateA && !dateB) return 1

    return dateA - dateB
  }

  pastSpins.sort(sortByDate)
  nextSpins.sort(sortByDate)

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
                {pastSpins.map((spin, idx) => {
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
                      background_color={spin.theme_color as ColorOptionsType}
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
                {nextSpins.map((spin, idx) => {
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
                      background_color={spin.theme_color as ColorOptionsType}
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
