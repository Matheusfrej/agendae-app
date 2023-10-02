import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  width: 80%;
  margin: auto;
  margin-top: 40%;
  margin-bottom: 10%;
`

export const Header = styled.View`
  width: 100%;
  color: ${({ theme }) => theme.COLORS.BLACK};
  margin-bottom: 20px;
`

export const Text = styled.Text`
  font-size: 24px;
`

export const Span = styled.Text`
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
`

interface DayProps {
  fontSize: number
}

export const Day = styled.Text<DayProps>`
  font-size: ${(props) => props.fontSize}px;
  font-weight: 600;
`

export const SpinsContainer = styled.View`
  gap: 12px;
`

export const NoContent = styled.View`
  width: 90%;
  margin: auto;
`

export const NoContentText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.COLORS.GRAY_700};
`
