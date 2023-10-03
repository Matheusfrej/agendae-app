import { CreateSpin } from '@components/CreateSpin'

import * as S from './styles'
import { ScrollContainer } from '../../components/ScrollContainer'

export function CreateUpdateSpin() {
  return (
    <>
      <ScrollContainer>
        <S.Container>
          <S.Title>CreateUpdateSpin</S.Title>
        </S.Container>
        <CreateSpin />
      </ScrollContainer>
    </>
  )
}
