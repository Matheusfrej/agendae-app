import styled from 'styled-components/native'
import { ColorOptionsType } from '../../@types/types'

export const TouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`

interface SpinCardContainerProps {
  variant: ColorOptionsType
}

export const SpinCardContainer = styled.View<SpinCardContainerProps>`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY_300};
  border-radius: 8px;
  padding: 10px;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'purple':
        return theme.COLORS.CARD_PURPLE
      case 'green':
        return theme.COLORS.CARD_GREEN
      case 'red':
        return theme.COLORS.CARD_RED
      case 'yellow':
        return theme.COLORS.CARD_YELLOW
      case 'cyan':
        return theme.COLORS.CARD_CYAN
      case 'blue':
        return theme.COLORS.CARD_BLUE
      default:
        return theme.COLORS.CARD_PURPLE
    }
  }};
`

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const Creator = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
export const Bold = styled.Text`
  flex: 1;
  font-weight: bold;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM};
  color: ${({ theme }) => theme.COLORS.WHITE};
`

export const Dates = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
`

export const Date = styled.Text`
  width: 100%;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM};
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-align: right;
`

export const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
  margin-top: -5px;
`

export const Title = styled.Text`
  width: 80%;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.XL};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-weight: bold;
`
