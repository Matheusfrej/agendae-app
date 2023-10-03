import { CreateSpin } from '@components/CreateSpin'

import * as S from './styles'
import { ScrollContainer } from '../../components/ScrollContainer'
import { BackButton } from '@components/BackButton'
import { SpinCard, SpinCardContainerVariant } from '@components/SpinCard'
import { SpinsOfDayScreenRouteProp } from 'src/@types/navigation'
import { useRoute } from '@react-navigation/native'

export function SpinsOfDay() {
  const route = useRoute<SpinsOfDayScreenRouteProp>()
  const { day, month, year } = route.params

  const spins = [
    {
      title: 'Teste 1',
      start_date: '27/09',
      end_date: '28/09',
    },
    {
      title: 'Teste 1',
      start_date: '27/09',
      end_date: '28/09',
    },
    {
      title: 'Teste 1',
      start_date: '27/09',
      end_date: '28/09',
    },
    {
      title: 'Teste 1',
      start_date: '27/09',
      end_date: '28/09',
    },
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
      <BackButton />
      <ScrollContainer>
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
            {spins.length > 0 ? (
              spins.map((spin, idx) => {
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
              })
            ) : (
              <S.NoContent>
                <S.NoContentText>
                  Não há nenhum rolê agendado para o dia{' '}
                  <S.Day fontSize={20}>
                    {day} de {month} de {year}.
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
