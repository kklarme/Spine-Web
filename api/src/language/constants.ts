import { Language } from './Language';
import { SpineLanguageBit } from './SpineLanguageBit';

export const LANGUAGE_BIT_MAP: Record<Language, SpineLanguageBit> = {
  [Language.German]: SpineLanguageBit.German,
  [Language.English]: SpineLanguageBit.English,
  [Language.Polish]: SpineLanguageBit.Polish,
  [Language.Russian]: SpineLanguageBit.Russian,
};

export const LANGUAGE_NAME_MAP: Record<Language, string> = {
  [Language.German]: 'Deutsch',
  [Language.English]: 'English',
  [Language.Polish]: 'Polish',
  [Language.Russian]: 'Russian',
};
