import * as S from './styles'

interface LabelProps {
  isRequired?: boolean
  isInline?: boolean
  text: string
}

export function Label({ isRequired, isInline, text }: LabelProps) {
  return (
    <S.Label isInline={isInline}>
      {text}
      {isRequired && <S.After> *</S.After>}
    </S.Label>
  )
}
