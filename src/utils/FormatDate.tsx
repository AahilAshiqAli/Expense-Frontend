export default function FormatDate(date: Date) {

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date === today) {
    return 'Today';
  } else if (date === yesterday) {
    return 'Yesterday';
  }
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
  return formattedDate;
}
