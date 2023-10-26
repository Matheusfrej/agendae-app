import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 150px;
`

interface ProfileNavigationContainerProps {
  variant: 'black' | 'purple'
}

export const TitleNotLogged = styled.Text`
  font-size: 32px;
  color: ${(props) => props.theme.COLORS.PURPLE_500};
`

export const Title = styled.Text<ProfileNavigationContainerProps>`
  font-size: 20px;
  color: ${(props) =>
    props.variant === 'purple'
      ? props.theme.COLORS.PURPLE_700
      : props.theme.COLORS.BLACK};
`
interface TextProps {
  variant?: 'purple'
  fontSize?: number
}

export const Text = styled.Text<TextProps>`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '24px')};
  text-align: center;
  color: ${(props) =>
    props.variant === 'purple' ? props.theme.COLORS.PURPLE_700 : 'black'};
`

export const Bold = styled.Text`
  font-weight: bold;
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

export const StatisticsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`

export const Statistic = styled.View``

export const ProfileImageAndName = styled.View`
  gap: 40px;
  align-items: center;
  margin-top: 40px;
`

export const NavigationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

export const ProfileNavigationContainer = styled.TouchableOpacity<ProfileNavigationContainerProps>`
  width: 35%;
  align-items: center;
  border-bottom-color: ${(props) =>
    props.variant === 'purple'
      ? props.theme.COLORS.PURPLE_700
      : props.theme.COLORS.BLACK};
  padding-bottom: 10px;
  border-bottom-width: 1px;
`

export const FooterText = styled.Text`
  text-decoration: underline;
  text-align: center;
  color: ${(props) => props.theme.COLORS.RED};
`

export const FooterTextContainer = styled.View`
  align-self: center;
  width: fit-content;
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 20px;
`

export const FooterTextTouchable = styled.TouchableOpacity``

export const AddFriendButtonContainer = styled.View`
  align-items: center;
  margin-top: 24px;
  justify-self: center;
  margin: 0;
  position: absolute;
  top: 95px;
  z-index: 1000;
  right: 5%;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
  background: ${(props) => props.theme.COLORS.WHITE};
  border-radius: 8px;
  min-width: 90px;
`
