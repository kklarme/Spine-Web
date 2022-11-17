import { Language, SPINE_LANGUAGE_MAP, SpineLanguage } from '../language';
import { NewsData, SpineNews, SpineNewsTicker } from '../models';
import { Result } from '../result';

export class GetNewsDto {
  Language: SpineLanguage;

  constructor(language: Language | SpineLanguage) {
    this.Language = typeof language === 'string' ? SPINE_LANGUAGE_MAP[language] : language;
  }
}
export interface GetNewsResponse {
  News: SpineNews[];
  NewsTicker: SpineNewsTicker[];
}

export class GetNewsResult extends Result<GetNewsResponse, NewsData> {
  getResultClass(): { new (originalValue: GetNewsResponse): NewsData } {
    return NewsData;
  }
}
