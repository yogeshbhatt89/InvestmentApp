import { useSelector, useDispatch } from 'react-redux'
import { setDate, setIsOpen } from './DatePickerSlice'
import { useState, useEffect } from 'react'

export const useDatePicker = (reduxId: string) => {
  const dispatch = useDispatch()
  const datePickerState = useSelector((state: any) => state.datePicker[reduxId])

  if (!datePickerState) {
    dispatch(setDate({ reduxId, date: null }))
    dispatch(setIsOpen({ reduxId, isOpen: false }))
  }

  const { date, isOpen } = datePickerState

  const [selectedDate, setSelectedDate] = useState(date)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(isOpen)

  useEffect(() => {
    setSelectedDate(date)
    setIsDatePickerOpen(isOpen)
  }, [date, isOpen])

  const handleDateChange = (newDate: Date) => {
    dispatch(setDate({ reduxId, date: newDate }))
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
