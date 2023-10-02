import { css } from 'styled-components'
import styled from 'styled-components/native'

export const InviteContainer = styled.TouchableHighlight`
  width: 100%;
  gap: 15px;
`

export const Container = styled.View``

export const ProfileImage = styled.View`
  width: 60px;
  height: 60px;
  background: #d9d9d9;
  border-radius: 30px;
`

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  gap: 25px;
  flex: 1;
`

export const Texts = styled.View``

export const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
`

export const Description = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Actions = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 40px;
`

export const Section = styled.View`
  flex: 1;
  gap: 10px;
`

interface ButtonProps {
  variant: 'accept' | 'deny'
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  border-radius: 8px;
  padding: 6px 12px;
  background: ${(props) =>
    props.variant === 'accept' ? props.theme.COLORS.BLUE : 'transparent'};
  ${(props) =>
    props.variant === 'deny' &&
    css`
      border: 1px solid ${props.theme.COLORS.RED};
    `};
`

export const Text = styled.Text<ButtonProps>`
  color: ${(props) =>
    props.variant === 'accept'
      ? props.theme.COLORS.WHITE
      : props.theme.COLORS.RED};
`

export const Bar = styled.View`
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
`
