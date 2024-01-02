import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 5%;
`

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.COLORS.GRAY_700};
  margin-bottom: 5%;
`

export const Content = styled.View`
  width: 80%;
`

export const Form = styled.View`
  gap: 10px;
`

export const ButtonContainer = styled.View`
  margin: auto;
  margin-top: 40px;
`

export const Touchable = styled.TouchableOpacity``

export const Span = styled.Text`
  color: ${(props) => props.theme.COLORS.PURPLE_500};
`
