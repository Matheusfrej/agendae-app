import { CreateSpin } from '@components/CreateSpin'
import { ScrollContainer } from '../../theme/global'
import * as S from './styles'
import { NotificationsComponent } from '@components/NotificationsComponent'
import { Calendar } from '@components/Calendar'

export function HomeCalendar() {
  return (
    <>
      <ScrollContainer>
        <S.Container>
          <NotificationsComponent />
          <Calendar />
        </S.Container>
      </ScrollContainer>
      <CreateSpin />
    </>
  )
}
