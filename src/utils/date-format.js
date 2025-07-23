import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function dateFormat (date) {
  const formattedDate = dayjs.utc(date).local().format('MMMM DD, YYYY • hh:mm:ss a')
  return formattedDate
}
