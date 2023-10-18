import styled from 'styled-components/native'

export const ParticipantContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`

export const Div = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`

export const ProfileImage = styled.View`
  width: 50px;
  height: 50px;
  background: #d9d9d9;
  border-radius: 25px;
`
