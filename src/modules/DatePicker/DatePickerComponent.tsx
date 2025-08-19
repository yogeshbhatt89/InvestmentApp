import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDatePicker } from './useDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DatePickerProps {
  className?: string;
  reduxId: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  className,
  reduxId,
  ...props
}) => {
  const { value, onChange } = useDatePicker(reduxId);

  const handleDateChange = (value: any, _context: any) => {
    onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={className}
        value={value}
        onChange={handleDateChange}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
