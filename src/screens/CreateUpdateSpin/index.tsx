import * as S from './styles'
import { ScrollContainer } from '../../components/ScrollContainer'
import { useTheme } from 'styled-components'
import {
  CreateUpdateSpinScreenRouteProp,
  NavigationType,
} from 'src/@types/navigation'
import { useRoute } from '@react-navigation/native'
import { BackButton } from '@components/BackButton'
import { CustomButton } from '@components/CustomButton'
import { SelectList } from 'react-native-dropdown-select-list'
import { useState, useEffect } from 'react'
import { Switch } from 'react-native'
import { SpinCardContainerVariant } from '@components/SpinCard'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Label } from '@components/Label'
import MultiSelect from 'react-native-multiple-select'
import { useAuth } from '../../contexts/AuthContext'
import { useSpins } from '../../contexts/SpinsContext'
import { AppError } from '@utils/AppError'
import api from '../../libs/api'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '@components/CustomInput'
import { SpinDTO } from '../../dtos/spinDTO'

interface CreateUpdateSpinProps {
  navigation: NavigationType
}

interface SelectColorType {
  key: SpinCardContainerVariant
  value: string
}

const spinFormSchema = z.object({
  title: z
    .string({ required_error: 'O título é obrigatório' })
    .min(1, { message: 'O título é obrigatório' })
    .max(60),
  theme_color: z
    .enum(['purple', 'green', 'red', 'yellow', 'cyan', 'blue'])
    .default('purple'),
  description: z
    .string()
    .max(600, { message: 'Tamanho máximo excedido' })
    .optional(),
  place: z.string().max(100, { message: 'Tamanho máximo excedido' }).optional(),
  start_date: z.coerce.date().optional(),
  has_start_time: z.coerce.boolean(),
  end_date: z.coerce.date().optional(),
  has_end_time: z.coerce.boolean(),
})

type SpinFormInputs = z.infer<typeof spinFormSchema>

export function CreateUpdateSpin({ navigation }: CreateUpdateSpinProps) {
  const route = useRoute<CreateUpdateSpinScreenRouteProp>()

  const { user, setSnackbarStatus } = useAuth()
  const { spins, spinsUpdate } = useSpins()

  const { control, handleSubmit, reset, setValue } = useForm<SpinFormInputs>({
    resolver: zodResolver(spinFormSchema),
  })

  const [colorSelected, setColorSelected] = useState<SpinCardContainerVariant>(
    () => {
      if (route.params?.spin) {
        return route.params?.spin.theme_color
      }
      return 'purple'
    },
  )
  const [initialColor, setInitialColor] = useState<SelectColorType>({
    key: 'purple',
    value: 'Roxo',
  })
  const [colorsLoaded, setColorsLoaded] = useState(false)
  const [participantsSelected, setParticipantsSelected] = useState([
    '1',
    '2',
    '3',
  ])
  const [startDate, setStartDate] = useState(new Date())
  const [showStartDate, setShowStartDate] = useState(false)
  const [showStartTime, setShowStartTime] = useState(false)
  const [endDate, setEndDate] = useState(new Date())
  const [showEndDate, setShowEndDate] = useState(false)
  const [showEndTime, setShowEndTime] = useState(false)
  const [hasStartDate, setHasStartDate] = useState(() => {
    setValue('start_date', new Date())
    return true
  })
  const [hasEndDate, setHasEndDate] = useState(() => {
    setValue('end_date', new Date())
    return true
  })
  const [hasStartTime, setHasStartTime] = useState(() => {
    setValue('has_start_time', true)
    return true
  })
  const [hasEndTime, setHasEndTime] = useState(() => {
    setValue('has_end_time', true)
    return true
  })
  const [colorsData, setColorsData] = useState<SelectColorType[]>([])

  const onChangeStartDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate
    setShowStartDate(false)
    if (currentDate) {
      setStartDate(currentDate)
      setValue('start_date', currentDate)
    }
  }

  const onChangeStartTime = (
    event: DateTimePickerEvent,
    selectedTime?: Date,
  ) => {
    const currentTime = selectedTime
    setShowStartTime(false)
    if (currentTime) {
      setStartDate(currentTime)
      setValue('start_date', currentTime)
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
      setValue('end_date', currentDate)
    }
  }

  const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime
    setShowEndTime(false)
    if (currentTime) {
      setEndDate(currentTime)
      setValue('end_date', currentTime)
    }
  }

  // const participantsData: { id: string; name: string }[] = [
  //   { id: '1', name: 'Matheus' },
  //   { id: '2', name: 'Bruna' },
  //   { id: '3', name: 'Zé' },
  //   { id: '4', name: 'Carmen' },
  //   { id: '5', name: 'Nina' },
  //   { id: '6', name: 'Floffytinha' },
  //   { id: '7', name: 'Doiss' },
  // ]

  const theme = useTheme()

  const handleColorSelected = (val: SpinCardContainerVariant) => {
    setColorSelected(val)
    setValue('theme_color', val)
  }

  const editSpin = async (
    data: SpinFormInputs,
  ): Promise<SpinDTO | undefined> => {
    try {
      const response = await api.put(`/spins/${spin?.id}`, data)

      setSnackbarStatus('Rolê editado com sucesso', true)
      const edittedSpin: SpinDTO = response.data.spin
      if (spins) {
        console.log(spins)

        const edittedSpins = spins?.map((spin) => {
          console.log(spin.id, edittedSpin)

          if (spin.id === edittedSpin.id) {
            return edittedSpin
          }
          return spin
        })
        console.log(edittedSpins)

        spinsUpdate(edittedSpins)
      }

      return edittedSpin
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Erro na edição do rolê. Tente novamente mais tarde'
      setSnackbarStatus(title, false)
    }
  }

  const createSpin = async (
    data: SpinFormInputs,
  ): Promise<SpinDTO | undefined> => {
    try {
      const response = await api.post('/spins', data)

      setSnackbarStatus('Rolê criado com sucesso', true)
      const newSpin: SpinDTO = response.data.spin
      const newSpins = [...(spins as SpinDTO[]), newSpin]
      spinsUpdate(newSpins)

      return newSpin
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Erro na criação do rolê. tente novamente mais tarde'
      setSnackbarStatus(title, false)
    }
  }

  // const handleParticipantsSelected = (val: string[]) => {
  //   setParticipantsSelected(val)
  // }

  const spin = route.params?.spin

  const isEdit = spin !== undefined

  const handleCreateUpdateSpin = async (data: SpinFormInputs) => {
    let spin
    if (isEdit) {
      spin = await editSpin(data)
    } else {
      spin = await createSpin(data)
    }
    if (spin) {
      if (user) {
        spin.organizer = user
      }
      console.log(spin)

      navigation.navigate('Spin', { spin })
      reset()
    }
  }

  useEffect(() => {
    if (isEdit && spin) {
      setValue('title', spin.title)
      if (spin.description) setValue('description', spin.description)
      if (spin.place) setValue('place', spin.place)
      if (spin.start_date) {
        setValue('start_date', new Date(spin.start_date))
        setStartDate(new Date(spin.start_date))
      } else {
        setHasStartTime(false)
        setHasStartDate(false)
      }
      if (spin.end_date) {
        setValue('end_date', new Date(spin.end_date))
        setEndDate(new Date(spin.end_date))
      } else {
        setHasEndTime(false)
        setHasEndDate(false)
      }
      setValue('theme_color', spin.theme_color)
      setColorSelected(spin.theme_color)
      if (spin.has_start_time) {
        setValue('has_start_time', true)
      } else {
        setHasStartTime(false)
      }
      if (spin.has_end_time) {
        setValue('has_end_time', true)
      } else {
        setHasEndTime(false)
      }
    }
  }, [spin])

  useEffect(() => {
    if (hasStartDate === false) {
      setHasStartTime(false)
      setValue('start_date', undefined)
    } else {
      setValue('start_date', startDate)
    }
    if (hasEndDate === false) {
      setHasEndTime(false)
      setValue('end_date', undefined)
    } else {
      setValue('end_date', endDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStartDate, hasEndDate])

  useEffect(() => {
    setValue('has_start_time', hasStartTime)
    setValue('has_end_time', hasEndTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStartTime, hasEndTime])

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const { data } = await api.get('/spins/colors')

        setColorsData(data.colors)
        setInitialColor({
          key: colorSelected,
          value:
            data.colors.find((color: any) => colorSelected === color.key)
              ?.value || 'Roxo',
        })
        setColorsLoaded(true)
      } catch (error) {
        const isAppError = error instanceof AppError

        const title = isAppError ? error.message : 'Erro ao carregar as cores.'
        setSnackbarStatus(title, false)
      }
    }

    fetchColors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ScrollContainer>
        <BackButton />
        <S.SaveButtonContainer>
          <CustomButton
            variant="accept"
            text="Salvar"
            fontSize={16}
            onPress={handleSubmit(handleCreateUpdateSpin)}
          />
        </S.SaveButtonContainer>
        <S.Container>
          {isEdit ? (
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
              <Controller
                name="title"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <CustomInput
                      value={value}
                      isRequired
                      multiline
                      autoCapitalize="sentences"
                      onChangeText={onChange}
                      labelText="Título"
                      errorMessage={error?.message}
                    />
                  )
                }}
              />
              <Controller
                name="place"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <CustomInput
                      value={value}
                      autoCapitalize="sentences"
                      onChangeText={onChange}
                      labelText="Local"
                      multiline
                      errorMessage={error?.message}
                    />
                  )
                }}
              />

              <Controller
                name="description"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <CustomInput
                      value={value}
                      autoCapitalize="sentences"
                      onChangeText={onChange}
                      labelText="Descrição"
                      multiline
                      errorMessage={error?.message}
                    />
                  )
                }}
              />
              <S.InputSection>
                <Label text="Data de início" isInline />

                <S.Touchable
                  variant="big"
                  onPress={() => handleShowStartDate()}
                >
                  <S.TextInputDate
                    value={
                      hasStartDate
                        ? startDate.toLocaleDateString('pt-BR', {
                            timeZone: 'America/Sao_Paulo',
                          })
                        : ''
                    }
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
                    value={startDate}
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
                        ? startDate.toLocaleTimeString('pt-BR', {
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
                    onValueChange={() => {
                      if (hasStartDate === false && hasStartTime === false) {
                        setHasStartTime(true)
                      }
                      setHasStartDate((state) => !state)
                    }}
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
                    onValueChange={() => {
                      if (hasStartDate === false && hasStartTime === false) {
                        setHasStartDate(true)
                      }
                      setHasStartTime((state) => !state)
                    }}
                  />
                  <S.Text>Hora</S.Text>
                </S.SwitchContainer>
              </S.SwitchInputSection>
              <S.InputSection>
                <Label text="Data de fim" isInline />

                <S.Touchable variant="big" onPress={() => handleShowEndDate()}>
                  <S.TextInputDate
                    value={
                      hasEndDate
                        ? endDate.toLocaleDateString('pt-BR', {
                            timeZone: 'America/Sao_Paulo',
                          })
                        : ''
                    }
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
                    value={endDate}
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
                        ? endDate.toLocaleTimeString('pt-BR', {
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
                    onValueChange={() => {
                      if (hasEndDate === false && hasEndTime === false) {
                        setHasEndTime(true)
                      }
                      setHasEndDate((state) => !state)
                    }}
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
                    onValueChange={() => {
                      if (hasEndDate === false && hasEndTime === false) {
                        setHasEndDate(true)
                      }
                      setHasEndTime((state) => !state)
                    }}
                  />
                  <S.Text>Hora</S.Text>
                </S.SwitchContainer>
              </S.SwitchInputSection>

              <S.InputSection>
                <S.ColorAndLabel>
                  <S.ColorBox variant={colorSelected}></S.ColorBox>
                  <Label text="Cor" isInline />
                </S.ColorAndLabel>

                <S.SelectListContainer>
                  {colorsLoaded && (
                    <SelectList
                      setSelected={(val: SpinCardContainerVariant) =>
                        handleColorSelected(val)
                      }
                      data={colorsData}
                      save="key"
                      defaultOption={{
                        key: initialColor.key,
                        value: initialColor.value,
                      }}
                      searchPlaceholder="Escolher cor"
                      notFoundText="Cor não encontrada"
                      dropdownShown={false}
                      boxStyles={{}}
                    />
                  )}
                </S.SelectListContainer>
              </S.InputSection>
              {/* <S.InputSection isFlexDirecitionColumn>
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
              </S.InputSection> */}
            </S.Form>
          </S.Content>
        </S.Container>
      </ScrollContainer>
    </>
  )
}
