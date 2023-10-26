import styled from 'styled-components/native'

export const InviteContainer = styled.View`
  width: 100%;
`

export const Container = styled.View`
  gap: 20px;
  padding: 10px 0;
`

export const Texts = styled.View`
  align-items: center;
`

export const Description = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Actions = styled.View`
  flex-direction: row;
  gap: 40px;
  justify-content: center;
`
