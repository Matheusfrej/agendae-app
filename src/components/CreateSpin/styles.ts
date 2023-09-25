import styled from 'styled-components/native'

export const CreateSpinContainer = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.COLORS.PURPLE_700};
  z-index: 1000;
  border-radius: 1000px;
  padding: 10px;
  position: absolute;
  align-self: flex-end;

  bottom: 3%;
  right: 7%;
`
