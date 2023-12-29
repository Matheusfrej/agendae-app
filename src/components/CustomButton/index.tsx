import * as S from './styles'
import { ViewStyle } from 'react-native'

interface CustomButtonProps {
  variant: 'default' | 'accept' | 'deny' | 'warning' | 'abort'
  isDisabled?: boolean
  text: string
  fontSize?: number
  onPress?: () => void
  style?: ViewStyle
}

export function CustomButton({
  variant,
  text,
  fontSize,
  onPress,
  style,
  isDisabled,
}: CustomButtonProps) {
  return (
    <S.Button
      variant={variant}
      onPress={onPress}
      style={style}
      isDisabled={isDisabled}
    >
      <S.Text variant={variant} fontSize={fontSize}>
        {text}
      </S.Text>
    </S.Button>
  )
}
