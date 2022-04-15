import { Language, LANGUAGE_BIT_MAP, SpineLanguageBit } from '../SpineLanguage';

export class RequestAllNewsDto {
  Language: SpineLanguageBit;

  constructor(language: Language | SpineLanguageBit) {
    this.Language = typeof language === 'string' ? LANGUAGE_BIT_MAP[language] : language;
  }
}
