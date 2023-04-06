import { parseISO, formatDistanceToNow } from 'date-fns'

interface IProps {
  timestamp: string
}

function TimeAgo({ timestamp }: IProps) {
  let timeAgo = ''
  if (timestamp.length > 0) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
export default TimeAgo
