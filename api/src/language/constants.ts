import { Language } from './Language';
import { SpineLanguage } from './SpineLanguage';

export const SPINE_LANGUAGE_MAP: Record<Language, SpineLanguage> = {
  [Language.German]: SpineLanguage.German,
  [Language.English]: SpineLanguage.English,
  [Language.Polish]: SpineLanguage.Polish,
  [Language.Russian]: SpineLanguage.Russian,
};

export const LANGUAGE_NAME_MAP: Record<Language, string> = {
  [Language.German]: 'Deutsch',
  [Language.English]: 'English',
  [Language.Polish]: 'Polish',
  [Language.Russian]: 'Russian',
};
