import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'

export function Spin() {
  return (
    <>
      <BackButton />
      <ScrollContainer>
        <S.Container>
          <S.Title>rolê</S.Title>
        </S.Container>
      </ScrollContainer>
    </>
  )
}
