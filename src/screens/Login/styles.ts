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

const SubtextBase = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export const Register = styled(SubtextBase)`
  gap: 4px;
  padding: 20px 0;
  padding-top: 15px;
`

export const ForgotPassword = styled(SubtextBase)`
  padding-top: 20px;
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
