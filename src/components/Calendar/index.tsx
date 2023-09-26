import * as S from './styles'
import { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export function Calendar() {
  // getting new date, current year and month
  const [, setDate] = useState(new Date())
  const [currYear, setCurrYear] = useState(new Date().getFullYear())
  const [currMonth, setCurrMonth] = useState(new Date().getMonth())
  const [days, setDays] = useState<number[]>([])
  const [isCalendarRendered, setIsCalendarRendered] = useState(false)

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
    const newDays: number[] = []
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
    // let liTag = ''

    for (let i = firstDayofMonth; i > 0; i--) {
      // creating li of previous month last days
      // liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
      newDays.push(lastDateofLastMonth - i + 1)
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      // creating li of all days of current month
      // adding active class to li if the current day, month, and year matched
      // liTag += `<li class="${isToday}">${i}</li>`
      newDays.push(i)
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      // creating li of next month first days
      // liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
      newDays.push(i - lastDayofMonth + 1)
    }
    // currentDate.innerText = `${months[currMonth]} ${currYear}` // passing current mon and yr as currentDate text
    // daysTag.innerHTML = liTag
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
      setDate(new Date(currYear, newCurrMonth, new Date().getDate()))

      setCurrYear(
        new Date(currYear, newCurrMonth, new Date().getDate()).getFullYear(),
      ) // updating current year with new date year
      setCurrMonth(
        new Date(currYear, newCurrMonth, new Date().getDate()).getMonth(),
      ) // updating current month with new date month
    } else {
      setDate(new Date())
      setCurrMonth(newCurrMonth) // pass the current date as date value
    }
    renderCalendar(yearOffset, monthOffset)
  }

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.MonthYear>
          {months[currMonth]} de {currYear}
        </S.MonthYear>
        <S.Actions>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={32}
            color="black"
            onPress={() => changeMonth('prev')}
          />

          <MaterialIcons
            name="keyboard-arrow-right"
            size={32}
            color="black"
            onPress={() => changeMonth('next')}
          />
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
        <S.Line />
        <S.Days>
          {isCalendarRendered &&
            days.map((day, idx) => {
              return (
                <S.Day key={`${day}+${idx}`}>
                  <S.Text>{day}</S.Text>
                  <S.Line />
                </S.Day>
              )
            })}
        </S.Days>
      </S.CalendarContent>
    </S.CalendarContainer>
  )
}
