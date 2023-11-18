import * as S from './styles'
import { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { NavigationType } from 'src/@types/navigation'
import { Line } from '@components/Line'
import { useAuth } from '../../contexts/AuthContext'
import { useSpins } from '../../contexts/SpinsContext'
import { SpinDTO } from '../../dtos/spinDTO'

interface DaysType {
  day: number
  variant: 'inactive' | 'normal' | 'current'
}

export function Calendar() {
  const { isLogged } = useAuth()
  const { getSpinsByDate } = useSpins()

  const [currYear, setCurrYear] = useState(new Date().getFullYear())
  const [currMonth, setCurrMonth] = useState(new Date().getMonth())
  const [days, setDays] = useState<DaysType[]>([])
  const [isCalendarRendered, setIsCalendarRendered] = useState(false)

  const theme = useTheme()
  const navigation = useNavigation<NavigationType>()

  // storing full name of all months in array
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const renderCalendar = (currYearOffset = 0, currMonthOffset = 0) => {
    const newDays: DaysType[] = []
    const firstDayofMonth = new Date(
      currYear + currYearOffset,
      currMonth + currMonthOffset,
      1,
    ).getDay() // getting first day of month
    const lastDateofMonth = new Date(
      currYear + currYearOffset,
      currMonth + 1 + currMonthOffset,
      0,
    ).getDate() // getting last date of month
    const lastDayofMonth = new Date(
      currYear + currYearOffset,
      currMonth + currMonthOffset,
      lastDateofMonth,
    ).getDay() // getting last day of month
    const lastDateofLastMonth = new Date(
      currYear + currYearOffset,
      currMonth + currMonthOffset,
      0,
    ).getDate() // getting last date of previous month

    for (let i = firstDayofMonth; i > 0; i--) {
      newDays.push({ day: lastDateofLastMonth - i + 1, variant: 'inactive' })
    }
    const currentDate = new Date()
    for (let i = 1; i <= lastDateofMonth; i++) {
      if (
        i === currentDate.getDate() &&
        currentDate.getMonth() === currMonth + currMonthOffset &&
        currentDate.getFullYear() === currYear + currYearOffset
      ) {
        newDays.push({ day: i, variant: 'current' })
      } else {
        newDays.push({ day: i, variant: 'normal' })
      }
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      newDays.push({ day: i - lastDayofMonth + 1, variant: 'inactive' })
    }
    setDays(newDays)
    setIsCalendarRendered(true)
  }

  useEffect(() => {
    if (!isCalendarRendered) renderCalendar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function changeMonth(action: string) {
    const newCurrMonth = action === 'prev' ? currMonth - 1 : currMonth + 1
    let yearOffset = 0
    const monthOffset = action === 'prev' ? -1 : 1
    if (newCurrMonth < 0 || newCurrMonth > 11) {
      // if current month is less than 0 or greater than 11
      if (newCurrMonth < 0) {
        yearOffset = 1
      } else {
        yearOffset = -1
      }
      // creating a new date of current year & month and pass it as date value

      setCurrYear(
        new Date(currYear, newCurrMonth, new Date().getDate()).getFullYear(),
      ) // updating current year with new date year
      setCurrMonth(
        new Date(currYear, newCurrMonth, new Date().getDate()).getMonth(),
      ) // updating current month with new date month
    } else {
      setCurrMonth(newCurrMonth) // pass the current date as date value
    }
    renderCalendar(yearOffset, monthOffset)
  }

  const goToDate = (day: string, variant: string) => {
    if (!isLogged) {
      navigation.navigate('AuthStack', { screen: 'Login' })
    } else {
      if (variant === 'inactive') {
        if (+day > 15) {
          navigation.navigate('SpinsOfDay', {
            day,
            month: months[currMonth - 1].toLocaleLowerCase(),
            year: currYear,
            fullDate: new Date(currYear, currMonth - 1, +day).toISOString(),
          })
        } else {
          navigation.navigate('SpinsOfDay', {
            day,
            month: months[currMonth + 1].toLocaleLowerCase(),
            year: currYear,
            fullDate: new Date(currYear, currMonth + 1, +day).toISOString(),
          })
        }
      } else {
        navigation.navigate('SpinsOfDay', {
          day,
          month: months[currMonth].toLocaleLowerCase(),
          year: currYear,
          fullDate: new Date(currYear, currMonth, +day).toISOString(),
        })
      }
    }
  }

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.MonthYear>
          {months[currMonth]} de {currYear}
        </S.MonthYear>
        <S.Actions>
          <S.IconContainer
            onPress={() => changeMonth('prev')}
            activeOpacity={0.7}
            underlayColor={theme.COLORS.GRAY_300}
          >
            <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
          </S.IconContainer>
          <S.IconContainer
            onPress={() => changeMonth('next')}
            activeOpacity={0.7}
            underlayColor={theme.COLORS.GRAY_300}
          >
            <MaterialIcons
              name="keyboard-arrow-right"
              size={32}
              color="black"
            />
          </S.IconContainer>
        </S.Actions>
      </S.CalendarHeader>
      <S.CalendarContent>
        <S.Weeks>
          <S.Weekday>Dom</S.Weekday>
          <S.Weekday>Seg</S.Weekday>
          <S.Weekday>Ter</S.Weekday>
          <S.Weekday>Qua</S.Weekday>
          <S.Weekday>Qui</S.Weekday>
          <S.Weekday>Sex</S.Weekday>
          <S.Weekday>Sáb</S.Weekday>
        </S.Weeks>
        <S.LineContainer>
          <Line />
        </S.LineContainer>
        <S.Days>
          {isCalendarRendered &&
            days.map((day, idx) => {
              let spinsByDay: SpinDTO[]
              if (day.variant === 'inactive') {
                if (day.day > 15) {
                  spinsByDay = getSpinsByDate(
                    new Date(currYear, currMonth - 1, day.day),
                  )
                } else {
                  spinsByDay = getSpinsByDate(
                    new Date(currYear, currMonth + 1, day.day),
                  )
                }
              } else {
                spinsByDay = getSpinsByDate(
                  new Date(currYear, currMonth, day.day),
                )
              }

              return (
                <S.Day
                  key={`${day.day}+${idx}`}
                  onPress={() => goToDate(`${day.day}`, day.variant)}
                  activeOpacity={0.7}
                  underlayColor={theme.COLORS.GRAY_300}
                >
                  <>
                    <S.Text variant={day.variant}>{day.day}</S.Text>
                    <S.SpinsQuantity quantity={spinsByDay.length}>
                      {spinsByDay.length >= 4 ? '4+' : spinsByDay.length}
                    </S.SpinsQuantity>
                    <Line />
                  </>
                </S.Day>
              )
            })}
        </S.Days>
      </S.CalendarContent>
    </S.CalendarContainer>
  )
}
