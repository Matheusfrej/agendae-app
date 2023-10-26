import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 150px;
  gap: 50px;
`

export const Span = styled.Text`
  color: ${({ theme }) => theme.COLORS.PURPLE_700};
`

export const Text = styled.Text`
  font-size: 22px;
  font-weight: bold;
  border: 1px solid ${(props) => props.theme.COLORS.PURPLE_700};
  padding: 10px;
  border-radius: 8px;
`

export const LabelText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 80%;
`

export const InputSection = styled.View`
  width: 80%;
`

export const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.COLORS.GRAY_300};
  font-size: 20px;
  padding: 6px;
`
