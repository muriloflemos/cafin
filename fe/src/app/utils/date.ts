import { parse, format } from 'date-fns';

export const formatDate = (date: Date) => {
  const noTimeDate = date.toString().slice(0, 10);
  const year = noTimeDate.substring(0, 4);
  const month = noTimeDate.substring(5, 7);
  const day = noTimeDate.substring(8, 10);
  return `${day}/${month}/${year}`;
}

export const stringToDate = (value: string) => {
  try {
    if (value) {
      return parse(value, 'dd/MM/yyyy', new Date()).toISOString();
    }
    return null;
  } catch (e) {
    return null;
  }
}
