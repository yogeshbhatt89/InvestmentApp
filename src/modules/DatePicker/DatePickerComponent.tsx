import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useDatePicker } from './useDatePicker';
import dayjs from 'dayjs';

interface DatePickerComponentProps {
  reduxId: string;
  label?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ reduxId, label }) => {
  const { onChange } = useDatePicker(reduxId);

  const handleChange: DatePickerProps['onChange'] = (value, _context) => {
    const dayJsValue = dayjs(value);
    const formattedDate = dayJsValue.format("MM-DD-YYYY");
    const dateObject = dayjs(formattedDate).toDate();
    onChange(dateObject);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label || 'Select Date'}
        onChange={handleChange}
        format="MM-DD-YYYY"
        className="w-full h-10"
        sx={{ width: '100%', height: '20px' }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
