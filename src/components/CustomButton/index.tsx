import * as S from './styles'

interface CustomButtonProps {
  variant: 'default' | 'accept' | 'deny' | 'warning' | 'abort'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: any
}

export function CustomButton({ variant }: CustomButtonProps) {
  return (
    <S.Button variant={variant}>
      <S.Text variant={variant}>Aceitar</S.Text>
    </S.Button>
  )
}
