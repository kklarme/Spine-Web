import { Language } from 'spine-api';
import Flags, { Props as FlagProps } from 'country-flag-icons/react/3x2';
import { FC, memo } from 'react';

export const LANGUAGE_COUNTRY_FLAG_MAP: Record<Language, FC<FlagProps>> = {
  [Language.German]: memo(Flags.DE),
  [Language.English]: memo(Flags.US),
  [Language.Polish]: memo(Flags.PL),
  [Language.Russian]: memo(Flags.RU),
};

export const SERVER_URL = `/api/spine`;

export const CLOCKWORK_ORIGINS_DOWNLOADS_BASE_URL = 'https://clockwork-origins.de/Gothic/downloads';
