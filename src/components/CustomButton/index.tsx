import * as S from './styles'

interface CustomButtonProps {
  variant: 'default' | 'accept' | 'deny' | 'warning' | 'abort'
  text: string
  fontSize?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: any
}

export function CustomButton({
  variant,
  text,
  fontSize,
  onPress,
}: CustomButtonProps) {
  return (
    <S.Button variant={variant} onPress={onPress}>
      <S.Text variant={variant} fontSize={fontSize}>
        {text}
      </S.Text>
    </S.Button>
  )
}
