import { O } from 'ts-toolbelt';
import _mergeWith from 'lodash.mergewith';
import dayjs from 'dayjs';

export function merge<SOURCE extends object = any, OBJECTS extends any[] = any[]>(
  source: SOURCE,
  ...objects: OBJECTS
): O.MergeAll<SOURCE, OBJECTS, 'deep'> {
  return _mergeWith(source, ...objects);
}

export function parseSpineDate(date: string | number): Date {
  // TODO determine if starting time should be 00:00 (default) or set to 12:00
  // const start = dayjs('2000-01-01T12:00:00');
  const start = dayjs('2000-01-01');
  const dayDifference = typeof date === 'string' ? parseInt(date) : date;
  return start.add(dayDifference, 'day').toDate();
}

export interface FormatDownloadSizeOptions {
  fractionsDigits?: number;
  conversionRate?: number;
}

export function formatDownloadSize(
  downloadSize: number,
  options?: FormatDownloadSizeOptions,
): string {
  let unit = 'B';
  let size = downloadSize;
  const conversionRate = options?.conversionRate || 1024;
  while (size > conversionRate && unit != 'GB') {
    size /= conversionRate;
    if (unit == 'B') {
      unit = 'KB';
    } else if (unit == 'KB') {
      unit = 'MB';
    } else if (unit == 'MB') {
      unit = 'GB';
    }
  }
  return `${size.toFixed(options?.fractionsDigits ?? 1)} ${unit}`;
}

export function unescapeHtml(text: string): string {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
