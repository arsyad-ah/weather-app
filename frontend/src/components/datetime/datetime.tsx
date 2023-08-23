import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Paragraph } from '../../shared/style'
import { fetchMinDatetime } from '../../api/datafetcher'
import { DatetimeDto } from '../../dto'
import { DatetimeFormatter } from '../../shared/utils'

dayjs.extend(utc)
dayjs.extend(timezone)

interface DateAndTimeSelectorProps {
  datetime: Dayjs | null
  onDatetimeChange: (newDatetime: Dayjs | null) => void
}

const DateAndTimeSelector: React.FC<DateAndTimeSelectorProps> = (DateAndTimeSelectorProps) => {
  const { datetime, onDatetimeChange } = DateAndTimeSelectorProps
  const [minDatetime, setMinDatetime] = useState<DatetimeDto | null>()

  useEffect(() => {
    const fetchDatetimeData = async () => {
      const data = await fetchMinDatetime()
      setMinDatetime(data)
    }
    fetchDatetimeData()
  }, [])

  const minSelectableDate = dayjs(minDatetime?.timestamp)
  const maxSelectableDate = dayjs()

  const [date, time] = DatetimeFormatter(datetime?.toDate() || null)

  return (
    <div>
      <h2 className='title'>Select Date and Time</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={datetime}
          onChange={onDatetimeChange}
          label='Select date and time'
          // autoFocus
          minDateTime={minSelectableDate}
          maxDate={maxSelectableDate}
        />
      </LocalizationProvider>
      {datetime && (
        <div>
          <Paragraph>{`Date selected: ${date}`}</Paragraph>
          <Paragraph>{`Time selected: ${time}`}</Paragraph>
        </div>
      )}
    </div>
  )
}

export default DateAndTimeSelector
