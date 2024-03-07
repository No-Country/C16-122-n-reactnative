const getLocalDate = (date: string | Date) => {
  const utcDate = new Date(date);
  const timezoneOffsetMinutes = utcDate.getTimezoneOffset();
  const localDate = new Date(utcDate.getTime() + timezoneOffsetMinutes * 60000);
  return localDate;
};

export const formatDate = (date: string | Date) => {
  const localeDate = getLocalDate(date);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = localeDate.toLocaleDateString('es-ES', options);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalizamos el primer carácter del mes
};
