import { Language } from 'spine-api';
import Flags, { Props } from 'country-flag-icons/react/3x2';
import { FC, memo } from 'react';

export const LANGUAGE_COUNTRY_FLAG_MAP: Record<Language, FC<Props>> = {
  [Language.German]: memo(Flags.DE),
  [Language.English]: memo(Flags.US),
  [Language.Polish]: memo(Flags.PL),
  [Language.Russian]: memo(Flags.RU),
};

export const SERVER_URL = `/api/spine`;
