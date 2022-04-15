import dayjs from 'dayjs';

export const LEGACY_SPINE_DATE_START = dayjs('1970-01-01');
export const SPINE_DATE_START = dayjs('2000-01-01');

export class SpineDate {
  static parseLegacySpineDate(date: string | number): Date {
    const dayDifference = typeof date === 'string' ? parseInt(date) : date;
    return LEGACY_SPINE_DATE_START.clone()
      .add(dayDifference / 24)
      .toDate();
  }

  static parseDate(date: string | number): Date {
    const dayDifference = typeof date === 'string' ? parseInt(date) : date;
    return SPINE_DATE_START.clone().add(dayDifference, 'day').toDate();
  }
}
