export function localDate(date: string, locale: string = "es-ES"): string {
  return new Date(date).toLocaleString(locale);
}
