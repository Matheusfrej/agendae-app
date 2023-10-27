import { Image, ViewStyle } from 'react-native'

import * as S from './styles'

interface LogoProps {
  style?: ViewStyle
}

export function Logo({ style }: LogoProps) {
  return (
    <S.LogoContainer style={style}>
      <Image source={require('../../../assets/logo.png')} alt="" />
      <S.TitlesContainer>
        <S.Title>Agendaê</S.Title>
        <S.Subtitle>Agenda de rolê</S.Subtitle>
      </S.TitlesContainer>
    </S.LogoContainer>
  )
}
