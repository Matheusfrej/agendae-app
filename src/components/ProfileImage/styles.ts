import styled from 'styled-components/native'

interface ProfileImageProps {
  size: number
}

export const ProfileImage = styled.View<ProfileImageProps>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background: #d9d9d9;
  border-radius: 1000px;
`
