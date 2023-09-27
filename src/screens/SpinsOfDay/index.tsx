import { CreateSpin } from '@components/CreateSpin'

import * as S from './styles'
import { ScrollContainer } from '../../theme/global'
import { BackButton } from '@components/BackButton'

export function SpinsOfDay() {
  return (
    <>
      <ScrollContainer>
        <BackButton />
        <S.Container>
          <S.Title>Spins Of The Day</S.Title>
        </S.Container>
        <CreateSpin />
      </ScrollContainer>
    </>
  )
}
