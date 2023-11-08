import { CustomButton } from '@components/CustomButton'
import Modal from 'react-native-modal'
import * as S from './styles'

interface CustomModalProps {
  isVisible: boolean
  warningText?: string
  text: string
  onButtonPress: (confirm: boolean) => void
  buttonConfirmText: string
}

export function CustomModal({
  isVisible,
  text,
  warningText,
  onButtonPress,
  buttonConfirmText,
}: CustomModalProps) {
  return (
    <Modal isVisible={isVisible}>
      <S.Content>
        <S.Text>{text}</S.Text>
        <S.WarningText>{warningText}</S.WarningText>
        <S.Buttons>
          <CustomButton
            text={buttonConfirmText}
            variant="warning"
            fontSize={16}
            onPress={() => onButtonPress(true)}
          />
          <CustomButton
            text="Cancelar"
            variant="abort"
            fontSize={16}
            onPress={() => onButtonPress(false)}
          />
        </S.Buttons>
      </S.Content>
    </Modal>
  )
}
