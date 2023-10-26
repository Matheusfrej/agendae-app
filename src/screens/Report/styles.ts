import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 150px;
`

export const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
  font-weight: bold;
`
