import * as S from './styles'
import { ScrollContainer } from '../../components/ScrollContainer'
import { useTheme } from 'styled-components'
import {
  CreateUpdateSpinScreenRouteProp,
  PropsStack,
} from 'src/@types/navigation'
import { useRoute } from '@react-navigation/native'
import { BackButton } from '@components/BackButton'
import { CustomButton } from '@components/CustomButton'
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react'
import { View } from 'react-native'
import { SpinCardContainerVariant } from '@components/SpinCard'

interface CreateUpdateSpinProps {
  navigation: PropsStack
}

interface SelectColorType {
  key: SpinCardContainerVariant
  value: string
}

export function CreateUpdateSpin({ navigation }: CreateUpdateSpinProps) {
  const [selected, setSelected] = useState<SpinCardContainerVariant>('purple')

  const data: SelectColorType[] = [
    { key: 'purple', value: 'Roxo' },
    { key: 'green', value: 'Verde' },
    { key: 'red', value: 'Vermelho' },
    { key: 'yellow', value: 'Amarelo' },
    { key: 'cyan', value: 'Ciano' },
    { key: 'blue', value: 'Azul' },
  ]

  const route = useRoute<CreateUpdateSpinScreenRouteProp>()
  const theme = useTheme()

  const handleColorSelected = (val: SpinCardContainerVariant) => {
    setSelected(val)
  }

  const goToSpin = () => {
    navigation.navigate('Spin')
  }

  const { spinId } = route.params

  return (
    <>
      <BackButton />
      <S.SaveButtonContainer>
        <CustomButton
          variant="accept"
          text="Salvar"
          fontSize={16}
          onPress={() => goToSpin()}
        />
      </S.SaveButtonContainer>
      <ScrollContainer>
        <S.Container>
          {spinId ? (
            <S.Title>
              Editar <S.Span>rolê</S.Span>
            </S.Title>
          ) : (
            <S.Title>
              Agendar novo <S.Span>rolê</S.Span>
            </S.Title>
          )}
          <S.Content>
            <S.Form>
              <S.InputSection>
                <S.Label>Título</S.Label>
                <S.TextInput
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
              </S.InputSection>
              <S.InputSection>
                <S.Label>Data de início</S.Label>
                <S.TextInput
                  half={true}
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
                <S.TextInputHour
                  placeholder="Hora"
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
              </S.InputSection>
              <S.InputSection>
                <S.Label>Data de fim</S.Label>
                <S.TextInput
                  half={true}
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
                <S.TextInputHour
                  placeholder="Hora"
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
              </S.InputSection>
              <S.InputSection>
                <S.Label>Local</S.Label>
                <S.TextInput
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
              </S.InputSection>
              <S.InputSection>
                <S.Label>Descrição</S.Label>
                <S.TextInput
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                  multiline
                />
              </S.InputSection>
              <S.InputSection>
                <S.ColorAndLabel>
                  <S.ColorBox variant={selected}></S.ColorBox>
                  <S.Label>Cor</S.Label>
                </S.ColorAndLabel>

                <View style={{ flex: 1 }}>
                  <SelectList
                    setSelected={(val: SpinCardContainerVariant) =>
                      handleColorSelected(val)
                    }
                    data={data}
                    save="key"
                    defaultOption={{ key: 'purple', value: 'Roxo' }}
                    searchPlaceholder="Escolher cor"
                    dropdownShown={false}
                    boxStyles={{}}
                  />
                </View>
              </S.InputSection>
            </S.Form>
          </S.Content>
        </S.Container>
      </ScrollContainer>
    </>
  )
}
