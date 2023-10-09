import styled from 'styled-components/native'

interface LabelProps {
  isInline?: boolean
}

export const Label = styled.Text<LabelProps>`
  width: ${(props) => (props.isInline ? '30%' : '100%')};
  font-size: ${(props) => (props.isInline ? '14px' : '16px')};
`

export const After = styled.Text<LabelProps>`
  font-size: ${(props) => (props.isInline ? '14px' : '16px')};
  color: ${(props) => props.theme.COLORS.RED};
`
