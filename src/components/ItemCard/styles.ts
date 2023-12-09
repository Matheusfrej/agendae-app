import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity``

export const Content = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  gap: 25px;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
`

export const Texts = styled.View``

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`

export const Section = styled.View``
