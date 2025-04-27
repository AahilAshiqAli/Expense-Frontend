export default function FormatDate(dateInput: Date | string) {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error('Invalid date passed to FormatDate:', dateInput);
    return 'Invalid Date';
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Check same day
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return 'Today';
  }
  // Check yesterday
  else if (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  ) {
    return 'Yesterday';
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);

  return formattedDate;
}
