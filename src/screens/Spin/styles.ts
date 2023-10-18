import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 150px;
  margin-bottom: 20%;
`

export const HeaderTitle = styled.Text`
  font-size: 32px;
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
  margin-bottom: 20px;
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
`
