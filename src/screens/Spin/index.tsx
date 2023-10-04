import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { Line } from '@components/Line'

export function Spin() {
  const description =
    'Salve galera! Decidi organizar esse grupo pois está chegando uma data muito importante pra mim agora no dia 10 de outubro, o aniversário de Naruto Uzumaki.\nCoincidentemente, também é meu aniversário nesse dia. \nPorém, como caiu numa terça, decidi fazer  no dia 15 de outubro às 19h no Parada obrigatória da Zona Norte (R. Cardeal Arcoverde, 315).'

  return (
    <>
      <BackButton />
      <ScrollContainer>
        <S.Container>
          <S.HeaderTitle>rolê</S.HeaderTitle>
          <S.Content>
            <S.Title>Frejversário</S.Title>
            <S.Date>Início: Domingo, 15 de outubro de 2023, 18h</S.Date>
            <S.Place>
              Parada Obrigatória Graças - R. Cardeal Arcoverde, 315
            </S.Place>
            <Line />
            <S.Description>{description}</S.Description>
          </S.Content>
        </S.Container>
      </ScrollContainer>
    </>
  )
}
