import styled from 'styled-components/native'

export const Content = styled.View`
  background: ${(props) => props.theme.COLORS.WHITE};
  justify-content: center;
  width: 90%;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.COLORS.RED};
`

export const Text = styled.Text`
  font-size: 20px;
  text-align: center;
`

export const WarningText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.COLORS.RED};
`

export const Buttons = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-around;
`
