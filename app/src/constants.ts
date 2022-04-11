import { Language } from 'spine-api';
import Flags, { FlagComponent } from 'country-flag-icons/react/3x2';

export const LANGUAGE_COUNTRY_FLAG_MAP: Record<Language, FlagComponent> = {
  [Language.German]: Flags.DE,
  [Language.English]: Flags.US,
  [Language.Polish]: Flags.PL,
  [Language.Russian]: Flags.RU,
};

export const SERVER_URL = `/api/spine`;