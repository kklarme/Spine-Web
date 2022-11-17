import dayjs from 'dayjs';

export const SPINE_DATE_START = dayjs('2000-01-01');

export function parseDate(date: string | number): Date {
  const dayDifference = typeof date === 'string' ? parseInt(date) : date;
  return SPINE_DATE_START.clone().add(dayDifference, 'day').toDate();
}
