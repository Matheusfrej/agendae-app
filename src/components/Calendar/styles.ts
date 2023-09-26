import { css } from 'styled-components'
import styled from 'styled-components/native'

export const CalendarContainer = styled.View`
  flex: 1;
  margin-bottom: 150px;
`

export const CalendarHeader = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: -20px;
  margin-bottom: 20px;
`

export const MonthYear = styled.Text`
  flex: 1;
  width: 100%;
  font-size: ${(props) => props.theme.FONT_SIZE.XL};
  /* font-weight: bold; */
`

export const Actions = styled.View`
  flex-direction: row;
  gap: 20px;
`

export const Line = styled.View`
  margin-top: 8px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
`

export const Button = styled.TouchableOpacity`
  flex: 1;
  align-self: flex-end;
`

export const CalendarContent = styled.View`
  flex: 1;
  width: 100%;
`

export const Weeks = styled.View`
  /* flex: 1; */
  width: 100%;
  flex-direction: row;
  align-items: center;
`

export const Weekday = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${(props) => props.theme.FONT_SIZE.LG};
  font-weight: bold;
`

export const Days = styled.View`
  /* flex: 1; */
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
`

export const Day = styled.View`
  width: 14.285714%;
`

interface TextProps {
  variant?: 'inactive' | 'normal' | 'current'
}

export const Text = styled.Text<TextProps>`
  /* flex: 1; */
  text-align: center;
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: ${(props) => props.theme.FONT_SIZE.LG};
  color: ${(props) =>
    props.variant === 'inactive'
      ? props.theme.COLORS.GRAY_300
      : props.variant === 'current'
      ? props.theme.COLORS.WHITE
      : props.theme.COLORS.BLACK};
  ${(props) =>
    props.variant === 'current' &&
    css`
      background-color: ${(props) => props.theme.COLORS.BLUE};
      border-radius: 1000px;
      padding: 0;
      margin-top: 10px;
      margin-bottom: 5px;
    `}
`

interface SpinsQuantityProps {
  quantity: number
}

export const SpinsQuantity = styled.Text<SpinsQuantityProps>`
  text-align: center;
  align-items: center;
  align-self: center;
  height: 20px;
  width: 20px;
  justify-content: center;
  border-radius: 1000px;
  font-size: 12px;
  background-color: ${(props) =>
    props.quantity > 0
      ? props.theme.COLORS.PURPLE_300
      : props.theme.COLORS.WHITE};
  color: ${(props) => props.theme.COLORS.WHITE};
`
