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
import { Switch } from 'react-native'
import { SpinCardContainerVariant } from '@components/SpinCard'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Label } from '@components/Label'
import MultiSelect from 'react-native-multiple-select'

interface CreateUpdateSpinProps {
  navigation: PropsStack
}

interface SelectColorType {
  key: SpinCardContainerVariant
  value: string
}

export function CreateUpdateSpin({ navigation }: CreateUpdateSpinProps) {
  const [colorSelected, setColorSelected] =
    useState<SpinCardContainerVariant>('purple')
  const [participantsSelected, setParticipantsSelected] = useState([
    '1',
    '2',
    '3',
  ])
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [showStartDate, setShowStartDate] = useState(false)
  const [showStartTime, setShowStartTime] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [showEndDate, setShowEndDate] = useState(false)
  const [showEndTime, setShowEndTime] = useState(false)
  const [hasStartDate, setHasStartDate] = useState(true)
  const [hasEndDate, setHasEndDate] = useState(true)
  const [hasStartTime, setHasStartTime] = useState(true)
  const [hasEndTime, setHasEndTime] = useState(true)

  const onChangeStartDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate
    setShowStartDate(false)
    if (currentDate) {
      setStartDate(currentDate)
    }
  }

  const onChangeStartTime = (
    event: DateTimePickerEvent,
    selectedTime?: Date,
  ) => {
    const currentTime = selectedTime
    setShowStartTime(false)
    if (currentTime) {
      setStartTime(currentTime)
    }
  }

  const handleShowStartDate = () => {
    if (hasStartDate) {
      setShowStartDate(true)
    }
  }

  const handleShowStartTime = () => {
    if (hasStartTime) {
      setShowStartTime(true)
    }
  }

  const handleShowEndDate = () => {
    if (hasEndDate) {
      setShowEndDate(true)
    }
  }

  const handleShowEndTime = () => {
    if (hasEndTime) {
      setShowEndTime(true)
    }
  }

  const onChangeEndDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate
    setShowEndDate(false)
    if (currentDate) {
      setEndDate(currentDate)
    }
  }

  const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime
    setShowEndTime(false)
    if (currentTime) {
      setEndTime(currentTime)
    }
  }

  const colorsData: SelectColorType[] = [
    { key: 'purple', value: 'Roxo' },
    { key: 'green', value: 'Verde' },
    { key: 'red', value: 'Vermelho' },
    { key: 'yellow', value: 'Amarelo' },
    { key: 'cyan', value: 'Ciano' },
    { key: 'blue', value: 'Azul' },
  ]

  const participantsData: { id: string; name: string }[] = [
    { id: '1', name: 'Matheus' },
    { id: '2', name: 'Bruna' },
    { id: '3', name: 'Zé' },
    { id: '4', name: 'Carmen' },
    { id: '5', name: 'Nina' },
    { id: '6', name: 'Floffytinha' },
    { id: '7', name: 'Doiss' },
  ]

  const route = useRoute<CreateUpdateSpinScreenRouteProp>()
  const theme = useTheme()

  const handleColorSelected = (val: SpinCardContainerVariant) => {
    setColorSelected(val)
  }

  const handleParticipantsSelected = (val: string[]) => {
    setParticipantsSelected(val)
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
                <Label text="Título" isInline isRequired />
                <S.TextInput
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
              </S.InputSection>
              <S.InputSection>
                <Label text="Data de início" isInline />

                <S.Touchable
                  variant="big"
                  onPress={() => handleShowStartDate()}
                >
                  <S.TextInputDate
                    value={hasStartDate ? startDate.toLocaleDateString() : ''}
                    cursorColor={theme.COLORS.BLACK}
                    editable={false}
                  />
                </S.Touchable>
                {showStartDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode="date"
                    is24Hour={true}
                    onChange={onChangeStartDate}
                  />
                )}
                {showStartTime && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startTime}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeStartTime}
                  />
                )}
                <S.Touchable
                  variant="small"
                  onPress={() => handleShowStartTime()}
                >
                  <S.TextInputHour
                    placeholder="Hora"
                    value={
                      hasStartTime
                        ? startTime.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    selectionColor={theme.COLORS.BLUE}
                    cursorColor={theme.COLORS.GRAY_700}
                    editable={false}
                  />
                </S.Touchable>
              </S.InputSection>
              <S.SwitchInputSection>
                <S.SwitchContainer>
                  <Switch
                    value={hasStartDate}
                    trackColor={{
                      true: theme.COLORS.CARD_PURPLE,
                    }}
                    thumbColor={
                      hasStartDate
                        ? theme.COLORS.PURPLE_300
                        : theme.COLORS.GRAY_300
                    }
                    onValueChange={() => setHasStartDate((state) => !state)}
                  />
                  <S.Text>Data de Início</S.Text>
                </S.SwitchContainer>
                <S.SwitchContainer>
                  <Switch
                    value={hasStartTime}
                    trackColor={{
                      true: theme.COLORS.CARD_PURPLE,
                    }}
                    thumbColor={
                      hasStartTime
                        ? theme.COLORS.PURPLE_300
                        : theme.COLORS.GRAY_300
                    }
                    onValueChange={() => setHasStartTime((state) => !state)}
                  />
                  <S.Text>Hora</S.Text>
                </S.SwitchContainer>
              </S.SwitchInputSection>
              <S.InputSection>
                <Label text="Data de fim" isInline />

                <S.Touchable variant="big" onPress={() => handleShowEndDate()}>
                  <S.TextInputDate
                    value={hasEndDate ? endDate.toLocaleDateString() : ''}
                    cursorColor={theme.COLORS.BLACK}
                    editable={false}
                  />
                </S.Touchable>
                {showEndDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode="date"
                    is24Hour={true}
                    onChange={onChangeEndDate}
                  />
                )}
                {showEndTime && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endTime}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeEndTime}
                  />
                )}
                <S.Touchable
                  variant="small"
                  onPress={() => handleShowEndTime()}
                >
                  <S.TextInputHour
                    placeholder="Hora"
                    value={
                      hasEndTime
                        ? endTime.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    selectionColor={theme.COLORS.BLUE}
                    cursorColor={theme.COLORS.GRAY_700}
                    editable={false}
                  />
                </S.Touchable>
              </S.InputSection>
              <S.SwitchInputSection>
                <S.SwitchContainer>
                  <Switch
                    value={hasEndDate}
                    trackColor={{
                      true: theme.COLORS.CARD_PURPLE,
                    }}
                    thumbColor={
                      hasEndDate
                        ? theme.COLORS.PURPLE_300
                        : theme.COLORS.GRAY_300
                    }
                    onValueChange={() => setHasEndDate((state) => !state)}
                  />
                  <S.Text>Data de fim</S.Text>
                </S.SwitchContainer>
                <S.SwitchContainer>
                  <Switch
                    value={hasEndTime}
                    trackColor={{
                      true: theme.COLORS.CARD_PURPLE,
                    }}
                    thumbColor={
                      hasEndTime
                        ? theme.COLORS.PURPLE_300
                        : theme.COLORS.GRAY_300
                    }
                    onValueChange={() => setHasEndTime((state) => !state)}
                  />
                  <S.Text>Hora</S.Text>
                </S.SwitchContainer>
              </S.SwitchInputSection>
              <S.InputSection>
                <Label text="Local" isInline />

                <S.TextInput
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                />
              </S.InputSection>

              <S.InputSection>
                <Label text="Descrição" isInline />

                <S.TextInput
                  selectionColor={theme.COLORS.BLUE}
                  cursorColor={theme.COLORS.GRAY_700}
                  multiline
                />
              </S.InputSection>

              <S.InputSection>
                <S.ColorAndLabel>
                  <S.ColorBox variant={colorSelected}></S.ColorBox>
                  <Label text="Cor" isInline />
                </S.ColorAndLabel>

                <S.SelectListContainer>
                  <SelectList
                    setSelected={(val: SpinCardContainerVariant) =>
                      handleColorSelected(val)
                    }
                    data={colorsData}
                    save="key"
                    defaultOption={{ key: 'purple', value: 'Roxo' }}
                    searchPlaceholder="Escolher cor"
                    notFoundText="Cor não encontrada"
                    dropdownShown={false}
                    boxStyles={{}}
                  />
                </S.SelectListContainer>
              </S.InputSection>
              <S.InputSection isFlexDirecitionColumn>
                <Label text="Participantes" isInline />

                <S.MultipleSelectListContainer>
                  <MultiSelect
                    items={participantsData}
                    uniqueKey="id"
                    onSelectedItemsChange={handleParticipantsSelected}
                    selectedItems={participantsSelected}
                    selectText="Escolher participantes"
                    selectedText="escolhidos"
                    searchInputPlaceholderText="Buscar participantes"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor={theme.COLORS.BLACK}
                    styleListContainer={{ padding: 10 }}
                    styleInputGroup={{
                      padding: 10,
                      borderColor: theme.COLORS.GRAY_700,
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    noItemsText="Usuário não encontrado"
                    selectedItemTextColor={theme.COLORS.PURPLE_500}
                    selectedItemIconColor={theme.COLORS.PURPLE_500}
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Fechar"
                  />
                </S.MultipleSelectListContainer>
              </S.InputSection>
            </S.Form>
          </S.Content>
        </S.Container>
      </ScrollContainer>
    </>
  )
}
