import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 150px;
  margin-bottom: 150px;
`

export const AddFriendButtonContainer = styled.View`
  align-items: center;
  margin-top: 24px;
  justify-self: center;
  margin: 0;
  position: absolute;
  top: 80px;
  z-index: 1000;
  right: 5%;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
  background: ${(props) => props.theme.COLORS.WHITE};
  border-radius: 8px;
  min-width: 90px;
`

interface ProfileNavigationContainerProps {
  variant: 'black' | 'purple'
}

export const Title = styled.Text<ProfileNavigationContainerProps>`
  font-size: 20px;
  color: ${(props) =>
    props.variant === 'purple'
      ? props.theme.COLORS.PURPLE_700
      : props.theme.COLORS.BLACK};
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

export const FriendsContainer = styled.View`
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  gap: 10px;
`
