import styled from 'styled-components/native'

export const PicklistContainer = styled.View`
  gap: 20px;
`

export const Card = styled.View`
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_700};
  border-radius: 8px;
`

export const CardHeader = styled.View``

export const TitleContainer = styled.View`
  padding: 20px;
  background: #f1f3f2;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`

export const Search = styled.TextInput`
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
  height: 50px;
  padding: 10px;
  font-size: 16px;
`

export const Content = styled.ScrollView`
  height: 220px;
`
