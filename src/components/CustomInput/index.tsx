import { Label } from '@components/Label'
import { useTheme } from 'styled-components'
import { TextInputProps, ViewStyle } from 'react-native'
import * as S from './styles'

interface CustomInputProps extends TextInputProps {
  errorMessage?: string
  labelText?: string
  isRequired?: boolean
  isInline?: boolean
  viewStyle?: ViewStyle
}

export function CustomInput({
  errorMessage,
  labelText,
  isRequired,
  isInline,
  viewStyle,
  ...textInputProps
}: CustomInputProps) {
  const theme = useTheme()

  return (
    <S.InputSection style={viewStyle}>
      {labelText && (
        <Label text={labelText} isRequired={isRequired} isInline={isInline} />
      )}

      <S.TextInput
        autoCapitalize="none"
        selectionColor={theme.COLORS.BLUE}
        cursorColor={theme.COLORS.GRAY_700}
        {...textInputProps}
        hasError={!!errorMessage}
      />
      {!!errorMessage && (
        <S.ErrorMessageText>{errorMessage}</S.ErrorMessageText>
      )}
    </S.InputSection>
  )
}
