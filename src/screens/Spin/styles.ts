import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 150px;
  margin-bottom: 10%;
`

export const FullContainer = styled.View`
  width: 100%;
  align-items: flex-end;
`

interface HeaderTitleProps {
  invited?: boolean
}

export const HeaderTitle = styled.Text<HeaderTitleProps>`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
  margin-bottom: 20px;
  margin-top: ${(props) => (props.invited ? '20px' : '')};
`

export const Section = styled.TouchableOpacity`
  width: 90%;
  border-radius: 8px;
  flex-direction: row;
  height: fit-content;
  align-items: baseline;
  gap: 10px;
  align-items: center;
`

export const Content = styled.View`
  gap: 12px;
  width: 100%;
`

export const ParticipantsContainer = styled.View`
  gap: 12px;
`

export const Title = styled.Text`
  font-size: 32px;
  padding-bottom: 10px;
`

export const Date = styled.Text`
  font-size: 20px;
`

export const Place = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Description = styled.Text`
  font-size: 18px;
  line-height: 24px;
`

const BaseContainer = styled.View`
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 20px;
`

export const CreatedContainer = styled(BaseContainer)`
  align-self: flex-end;
  margin-right: 10%;
`

export const LeaveContainer = styled.TouchableOpacity`
  align-self: center;
  margin-top: 0px;
  margin-bottom: 0px;
`

const BaseText = styled.Text`
  font-size: 20px;
`

export const Created = styled(BaseText)`
  color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Leave = styled(BaseText)`
  color: ${(props) => props.theme.COLORS.RED};
  text-decoration: underline;
`

export const CreatedTouchableText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
`

export const Footer = styled.View`
  margin-top: 100px;
  width: 100%;
`
