import { CreateSpin } from '@components/CreateSpin'

import * as S from './styles'
import { ScrollContainer } from '../../theme/global'

export function SpinsOfDay() {
  return (
    <>
      <ScrollContainer>
        <S.Container>
          <S.Title>Spins Of The Day</S.Title>
        </S.Container>
        <CreateSpin />
      </ScrollContainer>
    </>
  )
}
