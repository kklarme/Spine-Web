export enum SpineLanguageBit {
  None = 0,
  German = 1 << 0, // 1
  English = 1 << 1, // 2
  Polish = 1 << 2, // 4
  Russian = 1 << 3, // 8
  Count = 1 << 4,
}

export enum Language {
  German = 'de',
  English = 'en',
  Polish = 'pl',
  Russian = 'ru',
}

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

export type LanguageMap = Record<string, Language[]>;

export class SpineLanguage {
  static get languageMap(): LanguageMap {
    return this.languageCombinations.reduce((languageMap: LanguageMap, languages) => {
      const bitValue = languages.reduce((bitVal, language) => {
        bitVal = bitVal | LANGUAGE_BIT_MAP[language];
        return bitVal;
      }, 0);
      languageMap[bitValue] = languages;
      return languageMap;
    }, {});
  }

  private static get languageCombinations(): Language[][] {
    const addToCombinations = function (
      index: number,
      languages: Language[],
      usedLanguages: Language[],
      combinations: Language[][],
    ) {
      if (index === 0) {
        if (usedLanguages.length) {
          combinations.push(usedLanguages);
        }
        return;
      }
      languages.forEach((language, j) => {
        addToCombinations(
          index - 1,
          languages.slice(j + 1),
          [...usedLanguages, language],
          combinations,
        );
      });
    };

    const languagePool = Object.values(Language);

    const combinations: Language[][] = [];
    for (let i = 0; i < languagePool.length; i++) {
      addToCombinations(i, languagePool, [], combinations);
    }
    combinations.push(languagePool);
    return combinations;
  }
}
