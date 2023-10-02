import * as S from './styles'

interface CustomButtonProps {
  variant: 'default' | 'accept' | 'deny' | 'warning' | 'abort'
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: any
}

export function CustomButton({ variant, text, onPress }: CustomButtonProps) {
  return (
    <S.Button variant={variant} onPress={onPress}>
      <S.Text variant={variant}>{text}</S.Text>
    </S.Button>
  )
}
