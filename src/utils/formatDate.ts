export function formatDate(dateInput: string | Date) {
  const deadlineDate = new Date(dateInput)

  const formattedDeadline = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(deadlineDate)

  return formattedDeadline
}

export function transformDateToYMD(date: Date) {
  const year = date.getFullYear()
  let month: string | number = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day: string | number = date.getDate()
  day = day < 10 ? '0' + day : day
  return `${year}-${month}-${day}`
}
