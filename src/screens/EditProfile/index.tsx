import { BackButton } from '@components/BackButton'
import { ScrollContainer } from '../../components/ScrollContainer'

import * as S from './styles'
import { CustomButton } from '@components/CustomButton'
import { Label } from '@components/Label'
import { useTheme } from 'styled-components'
import { PropsStack } from 'src/@types/navigation'

interface EditProfileProps {
  navigation: PropsStack
}

export function EditProfile({ navigation }: EditProfileProps) {
  const theme = useTheme()

  return (
    <ScrollContainer>
      <BackButton />
      <S.SaveButtonContainer>
        <CustomButton
          text="Salvar"
          variant="accept"
          fontSize={20}
          onPress={() => navigation.navigate('Profile')}
        />
      </S.SaveButtonContainer>
      <S.Container>
        <S.Title>Editar perfil</S.Title>
        <S.Form>
          <S.InputSection>
            <Label text="Nome" isRequired />
            <S.TextInput
              selectionColor={theme.COLORS.BLUE}
              cursorColor={theme.COLORS.GRAY_700}
            />
          </S.InputSection>
          <S.InputSection>
            <Label text="Apelido" />
            <S.TextInput
              selectionColor={theme.COLORS.BLUE}
              cursorColor={theme.COLORS.GRAY_700}
            />
          </S.InputSection>
        </S.Form>
      </S.Container>
      <S.TextContainer>
        <S.Text>Excluir minha conta</S.Text>
      </S.TextContainer>
    </ScrollContainer>
  )
}
