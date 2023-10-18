import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: auto;
`

export const Title = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
`

export const Subtitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
`

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  justify-content: space-around;
`
