import { format } from 'date-fns';

export const formatDate = (date: string | undefined) => {
  if (!date) return '';
  return format(date, 'MM.dd.yyyy');
};

export const formatOnlyHour = (date: string | undefined) => {
  if (!date) return '';
  return format(date, 'hh:mm');
};

export const formatDateAndHour = (date: string | undefined) => {
  if (!date) return '';
  return format(date, 'MM.dd.yyyy hh:mm');
};

export const capitalizeFirstLetter = (str: string | undefined) => {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
};
