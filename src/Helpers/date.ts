export function extractDateAndTimeFromDate(dateToExtract: string): {
  date: string;
  time: string;
} {
  const date = new Date(dateToExtract);

  return {
    date: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
    time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
  };
}
