export function extractDateAndTimeFromDate(dateToExtract: string): {
  date: string;
  time: string;
} {
  const date = new Date(dateToExtract);

  return {
    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
  };
}
