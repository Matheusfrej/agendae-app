import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  width: 100%;
  margin-top: 150px;
  margin-bottom: 200px;
`

export const Title = styled.Text`
  font-size: 28px;
`

export const SaveButtonContainer = styled.View`
  align-items: center;
  margin-top: 24px;
  justify-self: center;
  margin: 0;
  position: absolute;
  top: 100px;
  z-index: 1000;
  right: 10%;
  border: 1px solid ${(props) => props.theme.COLORS.GRAY_300};
  background: ${(props) => props.theme.COLORS.WHITE};
  border-radius: 8px;
`

export const Form = styled.View`
  gap: 20px;
  width: 80%;
  margin-top: 30px;
`

export const InputSection = styled.View``

export const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.COLORS.GRAY_300};
`

export const Text = styled.Text`
  text-decoration: underline;
  text-align: center;
  color: ${(props) => props.theme.COLORS.RED};
`

export const TextContainer = styled.TouchableOpacity`
  align-self: center;
  width: fit-content;
  margin-bottom: 50px;
`

export const ProfileImageContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`
