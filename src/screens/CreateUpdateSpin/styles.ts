import { SpinCardContainerVariant } from '@components/SpinCard'
import { css } from 'styled-components'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 200px;
  margin-bottom: 20%;
`

export const SaveButtonContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  position: absolute;
  align-self: flex-end;
  border-radius: 8px;

  top: 94px;
  right: 7%;
`

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 10%;
`

export const Content = styled.View`
  width: 80%;
`

export const Form = styled.View`
  gap: 30px;
`

interface InputSectionProps {
  isFlexDirecitionColumn?: boolean
}

export const InputSection = styled.View<InputSectionProps>`
  flex-direction: ${(props) =>
    props.isFlexDirecitionColumn ? 'column' : 'row'};
  ${(props) =>
    !props.isFlexDirecitionColumn
      ? css`
          align-items: center;
        `
      : css`
          gap: 10px;
        `}
`

interface TextInputProps {
  half?: boolean
}

export const TextInput = styled.TextInput<TextInputProps>`
  border-bottom-width: 1px;
  ${(props) =>
    !props.half
      ? css`
          flex: 1;
        `
      : css`
          width: 40%;
        `}
  border-color: ${(props) => props.theme.COLORS.GRAY_300};
`

export const TextInputDate = styled(TextInput)`
  text-align: center;
  color: ${(props) => props.theme.COLORS.BLACK};
`

export const TextInputHour = styled(TextInput)`
  width: 100%;
  align-self: flex-end;
  text-align: center;
  color: black;
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

export const Login = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 20px 0;
`

export const ButtonContainer = styled.View`
  margin: auto;
`

export const Text = styled.Text`
  color: ${(props) => props.theme.COLORS.GRAY_700};
`

export const Span = styled.Text`
  color: ${(props) => props.theme.COLORS.PURPLE_500};
`

interface ColorBoxProps {
  variant: SpinCardContainerVariant
}

export const ColorBox = styled.View<ColorBoxProps>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'purple':
        return theme.COLORS.CARD_PURPLE
      case 'green':
        return theme.COLORS.CARD_GREEN
      case 'red':
        return theme.COLORS.CARD_RED
      case 'yellow':
        return theme.COLORS.CARD_YELLOW
      case 'cyan':
        return theme.COLORS.CARD_CYAN
      case 'blue':
        return theme.COLORS.CARD_BLUE
      default:
        return theme.COLORS.CARD_PURPLE
    }
  }};
`

export const ColorAndLabel = styled.View`
  width: 30%;
  flex-direction: row;
  gap: 8px;
`

interface TouchableProps {
  variant: 'small' | 'big'
}

export const Touchable = styled.TouchableOpacity<TouchableProps>`
  width: ${(props) => (props.variant === 'big' ? '40%' : '20%')};
  margin-left: ${(props) => (props.variant === 'small' ? '10%' : '0')};
`

export const SwitchInputSection = styled(InputSection)`
  justify-content: flex-end;
  margin: -20px 0;
  gap: 10px;
`

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const SelectListContainer = styled.View`
  width: 70%;
`

export const MultipleSelectListContainer = styled.View`
  width: 100%;
`
