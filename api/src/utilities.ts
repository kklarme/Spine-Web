import { O } from 'ts-toolbelt';
import _mergeWith from 'lodash.mergewith';

export function merge<SOURCE extends object = any, OBJECTS extends any[] = any[]>(
  source: SOURCE,
  ...objects: OBJECTS
): O.MergeAll<SOURCE, OBJECTS, 'deep'> {
  return _mergeWith(source, ...objects);
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
