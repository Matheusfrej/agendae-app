import { CreateSpin } from '@components/CreateSpin'

import * as S from './styles'
import { ScrollContainer } from '../../components/ScrollContainer'
import { BackButton } from '@components/BackButton'
import { SpinCard, SpinCardContainerVariant } from '@components/SpinCard'
import { SpinsOfDayScreenRouteProp } from 'src/@types/navigation'
import { useRoute } from '@react-navigation/native'
import { convertToLocaleDate, getUserSocialName } from '@utils/format'
import { useAuth } from '../../contexts/AuthContext'
import { useSpins } from '../../contexts/SpinsContext'

export function SpinsOfDay() {
  const route = useRoute<SpinsOfDayScreenRouteProp>()
  const { user } = useAuth()
  const { getSpinsByDate } = useSpins()

  const { day, month, year, fullDate } = route.params

  const filteredSpins = getSpinsByDate(new Date(fullDate))

  return (
    <>
      <ScrollContainer>
        <BackButton />
        <S.Container>
          <S.Header>
            <S.Text>
              <S.Span>Rolês</S.Span> agendados para o dia
            </S.Text>
            <S.Day fontSize={24}>
              {day} de {month} de {year}
            </S.Day>
          </S.Header>
          <S.SpinsContainer>
            {filteredSpins.length > 0 ? (
              filteredSpins.map((spin, idx) => {
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
              })
            ) : (
              <S.NoContent>
                <S.NoContentText>
                  Não há nenhum rolê agendado para o dia{' '}
                  <S.Day fontSize={20}>
                    {day} de {month} de {year}.{' '}
                  </S.Day>
                  Aperte no “+” para adicionar um.
                </S.NoContentText>
              </S.NoContent>
            )}
          </S.SpinsContainer>
        </S.Container>
      </ScrollContainer>
      <CreateSpin />
    </>
  )
}
