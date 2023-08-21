import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {Paragraph} from '../shared/style'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore")

interface DateAndTimeSelectorProps {
  datetime: Dayjs | null;
  onDatetimeChange: (newDatetime: Dayjs | null) => void;
  }

const DateAndTimeSelector: React.FC<DateAndTimeSelectorProps> = ({datetime, onDatetimeChange}) => {  
  return (
    <div>
      <h2>Select Date and Time</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker 
          value={datetime}
          onChange={onDatetimeChange}
          label="Select date and time"
          timezone="Asia/Singapore"
          autoFocus
        />
      </LocalizationProvider>
      <Paragraph>
        { datetime && (
          <p>{`Date selected: ${datetime.tz('Asia/Singapore').format('DD-MM-YYYY HH:mm:ss')}`}</p>
        )}
      </Paragraph>
        
    </div>
  ); 
};

export default DateAndTimeSelector;