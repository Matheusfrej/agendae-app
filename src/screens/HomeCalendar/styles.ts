import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
  font-weight: bold;
`
