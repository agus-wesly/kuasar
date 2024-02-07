export function formatDate(dateInput: string | Date) {
  const deadlineDate = new Date(dateInput)

  const formattedDeadline = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(deadlineDate)

  return formattedDeadline
}
