import * as S from './styles'

interface ProfileImageProps {
  size: number
}

export function ProfileImage({ size }: ProfileImageProps) {
  return <S.ProfileImage size={size} />
}
