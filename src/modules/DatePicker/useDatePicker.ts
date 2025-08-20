import { useSelector, useDispatch } from 'react-redux'
import { setDate, setIsOpen } from './DatePickerSlice'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

export const useDatePicker = (reduxId: string) => {
  const dispatch = useDispatch()
  const datePickerState = useSelector((state: any) => state.datePicker[reduxId])

  useEffect(() => {
    if (!datePickerState) {
      dispatch(setDate({ reduxId, date: null }))
      dispatch(setIsOpen({ reduxId, isOpen: false }))
    }
  }, [dispatch, reduxId, datePickerState])

  const { date, isOpen } = datePickerState ?? { date: null, isOpen: false }

  const [selectedDate, setSelectedDate] = useState(date)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(isOpen)

  useEffect(() => {
    setSelectedDate(date)
    setIsDatePickerOpen(isOpen)
  }, [date, isOpen])

  const handleDateChange = (newDate: Date) => {
    const formattedDate = dayjs(newDate).format('MM-DD-YYYY')
    dispatch(setDate({ reduxId, date: formattedDate }))
    setSelectedDate(newDate)
  }

  const handleToggleOpen = () => {
    dispatch(setIsOpen({ reduxId, isOpen: !isDatePickerOpen }))
    setIsDatePickerOpen(!isDatePickerOpen)
  }

  return {
    value: selectedDate,
    isOpen: isDatePickerOpen,
    onChange: handleDateChange,
    onToggleOpen: handleToggleOpen,
  }
}
