import styled from 'styled-components/native'

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const TitlesContainer = styled.View``

export const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.COLORS.PURPLE_700};
`

export const Subtitle = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.PURPLE_700};
`
