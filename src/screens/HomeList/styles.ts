import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  width: 85%;
  margin: auto;
  margin-top: 20%;
  gap: 60px;
`

export const Content = styled.View`
  flex: 1;
  gap: 30px;
`

export const NotificationContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
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

export const Texts = styled.View`
  width: 100%;
`

export const Title = styled.Text`
  width: 100%;

  font-size: 24px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`

export const Span = styled.Text`
  width: 100%;

  font-size: 24px;
  color: ${({ theme }) => theme.COLORS.PURPLE_500};
`

export const Subtitle = styled.Text`
  width: 80%;

  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  },
}))`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`
