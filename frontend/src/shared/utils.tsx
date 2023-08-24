import dayjs from 'dayjs'

export const DatetimeFormatter = (timestamp: Date | null) => {
  const convertedDatetime = dayjs(timestamp).tz('Asia/Singapore').format('DD-MM-YYYY|h:mm A')
  console.log(convertedDatetime)
  return convertedDatetime.split('|')
}
