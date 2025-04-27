export default function Colors(spend: number, budget: number) {
  const ratio: number = spend / budget;

  if (ratio >= 1) {
    return 'w-full';
  } else if (ratio >= 0.8) {
    return 'w-4/5';
  } else if (ratio >= 0.6) {
    return 'w-3/5';
  } else if (ratio >= 0.4) {
    return 'w-2/5';
  } else if (ratio >= 0.2) {
    return 'w-1/5';
  } else {
    return 'w-0';
  }
}
