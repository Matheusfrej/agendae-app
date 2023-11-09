import * as S from './styles'
import { ViewStyle } from 'react-native'

interface CustomButtonProps {
  variant: 'default' | 'accept' | 'deny' | 'warning' | 'abort'
  text: string
  fontSize?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: any
  style?: ViewStyle
}

export function CustomButton({
  variant,
  text,
  fontSize,
  onPress,
  style,
}: CustomButtonProps) {
  return (
    <S.Button variant={variant} onPress={onPress} style={style}>
      <S.Text variant={variant} fontSize={fontSize}>
        {text}
      </S.Text>
    </S.Button>
  )
}
