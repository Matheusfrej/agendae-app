import styled from 'styled-components/native'

export const PopupMenuContainer = styled.TouchableHighlight`
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  position: absolute;
  align-self: flex-end;
  border-radius: 1000px;
  padding: 10px;

  top: 10%;
  right: 7%;
`

export const ActionTouchable = styled.TouchableHighlight`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
`

interface ActionTextProps {
  color?: string
}

export const ActionText = styled.Text<ActionTextProps>`
  font-size: 16px;
  color: ${(props) => (props.color ? props.color : props.theme.COLORS.BLACK)};
`

export const ModelView = styled.View`
  align-items: center;
  margin-top: 24px;
  justify-self: center;
  margin: 0;
  position: absolute;
  top: 15%;
  z-index: 1000;
  /* padding: 10px; */
  right: 10%;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
  background: ${(props) => props.theme.COLORS.WHITE};
  border-radius: 8px;
`
