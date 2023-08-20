import React from 'react';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateAndTimeSelectorProps {
  datetime: Dayjs | null;
  onDatetimeChange: (newDatetime: Dayjs | null) => void;
  }

const DateAndTimeSelector: React.FC<DateAndTimeSelectorProps> = ({datetime, onDatetimeChange}) => {

  console.log(datetime)
  return (
    <div>
      <h4>Select Date and Time</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker 
          value={datetime}
          onChange={onDatetimeChange}
          label="Select date and time"
          autoFocus
        />
    </LocalizationProvider>
    { datetime && (
      <p>{`Date selected: ${datetime}`}</p>
    )}
    </div>
  ); 
};

export default DateAndTimeSelector;