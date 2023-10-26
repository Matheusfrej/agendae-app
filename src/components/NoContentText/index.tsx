import * as S from './styles'

interface NoContentTextProps {
  text: string
}

export function NoContentText({ text }: NoContentTextProps) {
  return <S.NoContentText>{text}</S.NoContentText>
}
