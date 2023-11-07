import styled from 'styled-components/native'

export const InputSection = styled.View``

interface TextInputProps {
  hasError: boolean
}

export const TextInput = styled.TextInput<TextInputProps>`
  border-bottom-width: 1px;
  border-color: ${(props) =>
    props.hasError ? props.theme.COLORS.CARD_RED : props.theme.COLORS.GRAY_300};
`

export const ErrorMessageText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.RED};
  margin-top: 4px;
  font-weight: bold;
`
