import * as S from './styles'
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export function Calendar() {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]
  // getting new date, current year and month
  const [, setDate] = useState(new Date())
  const [currYear, setCurrYear] = useState(new Date().getFullYear())
  const [currMonth, setCurrMonth] = useState(new Date().getMonth())

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

  // const renderCalendar = () => {
  //   const firstDayofMonth = new Date(currYear, currMonth, 1).getDay() // getting first day of month
  //   const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate() // getting last date of month
  //   const lastDayofMonth = new Date(
  //     currYear,
  //     currMonth,
  //     lastDateofMonth,
  //   ).getDay() // getting last day of month
  //   const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate() // getting last date of previous month
  //   let liTag = ''

  //   for (let i = firstDayofMonth; i > 0; i--) {
  //     // creating li of previous month last days
  //     liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
  //   }

  //   for (let i = 1; i <= lastDateofMonth; i++) {
  //     // creating li of all days of current month
  //     // adding active class to li if the current day, month, and year matched
  //     const isToday =
  //       i === date.getDate() &&
  //       currMonth === new Date().getMonth() &&
  //       currYear === new Date().getFullYear()
  //         ? 'active'
  //         : ''
  //     liTag += `<li class="${isToday}">${i}</li>`
  //   }

  //   for (let i = lastDayofMonth; i < 6; i++) {
  //     // creating li of next month first days
  //     liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
  //   }
  //   currentDate.innerText = `${months[currMonth]} ${currYear}` // passing current mon and yr as currentDate text
  //   daysTag.innerHTML = liTag
  // }
  // renderCalendar()

  function changeMonth(action: string) {
    const newCurrMonth = action === 'prev' ? currMonth - 1 : currMonth + 1

    if (newCurrMonth < 0 || newCurrMonth > 11) {
      // if current month is less than 0 or greater than 11
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
    // renderCalendar() // calling renderCalendar function
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
            size={24}
            color="black"
            onPress={() => changeMonth('prev')}
          />
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
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
        <S.Days>
          {days.map((day) => {
            return <S.Day key={day}>{day}</S.Day>
          })}
        </S.Days>
      </S.CalendarContent>
    </S.CalendarContainer>
  )
}
