import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Title = styled.Text`
  font-size: 36px;
  margin-bottom: 10%;
`

export const Content = styled.View`
  width: 80%;
`

export const Form = styled.View`
  gap: 10px;
`

export const InputSection = styled.View``

export const Label = styled.Text`
  font-size: 16px;
`

export const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.COLORS.GRAY_300};
`

export const Register = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 20px 0;
`

export const ButtonContainer = styled.View`
  margin: auto;
`

export const Text = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Touchable = styled.TouchableOpacity``

export const Span = styled.Text`
  color: ${(props) => props.theme.COLORS.PURPLE_500};
`
