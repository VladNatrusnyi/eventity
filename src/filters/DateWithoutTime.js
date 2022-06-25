export default function formatDateWithoutTime (value) {
  // return Date.parse(this.event_data.realTime)
  const time = new Date(value)
  const prefix = ''
  return typeof time === 'object' ? prefix + time.toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric' }) : ''
}
