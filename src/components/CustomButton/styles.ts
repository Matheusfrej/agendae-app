import { css } from 'styled-components'
import styled from 'styled-components/native'

interface ButtonProps {
  variant: 'default' | 'accept' | 'deny' | 'warning' | 'abort'
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  border-radius: 8px;
  ${(props) =>
    props.variant === 'default'
      ? css`
          padding: 10px 20px;
        `
      : css`
          padding: 5px 12px;
        `}
  background: ${(props) =>
    props.variant === 'accept'
      ? props.theme.COLORS.BLUE
      : props.variant === 'default'
      ? props.theme.COLORS.PURPLE_500
      : props.variant === 'warning'
      ? props.theme.COLORS.RED
      : 'transparent'};

  ${(props) =>
    props.variant === 'deny'
      ? css`
          border: 1px solid ${props.theme.COLORS.RED};
        `
      : props.variant === 'abort'
      ? css`
          border: 1px solid ${props.theme.COLORS.BLUE};
        `
      : ''};
`

export const Text = styled.Text<ButtonProps>`
  text-align: center;
  color: ${(props) =>
    props.variant === 'accept' ||
    props.variant === 'default' ||
    props.variant === 'warning'
      ? props.theme.COLORS.WHITE
      : props.variant === 'deny'
      ? props.theme.COLORS.RED
      : props.theme.COLORS.BLACK};
`
