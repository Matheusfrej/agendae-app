import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 100%;
  gap: 45px;
  margin-top: 90px;
  margin-bottom: 20%;
`

export const Title = styled.Text`
  font-size: 30px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`

export const InvitesContainer = styled.View`
  width: 80%;
  margin: 0 auto;
  gap: 10px;
`
