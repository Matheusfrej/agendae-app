import { CreateSpin } from '@components/CreateSpin'
import { ScrollContainer } from '../../theme/global'
import * as S from './styles'
import { Notifications } from '@components/Notifications'
import { Calendar } from '@components/Calendar'

export function HomeCalendar() {
  return (
    <>
      <ScrollContainer>
        <S.Container>
          <Notifications />
          <Calendar />
        </S.Container>
      </ScrollContainer>
      <CreateSpin />
    </>
  )
}
