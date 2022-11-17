export enum Language {
  German = 'de',
  English = 'en',
  Polish = 'pl',
  Russian = 'ru',
}
export type BitLanguageMap = Record<number, Language[]>;

export enum SpineLanguage {
  German = 1 << 0, // 1
  English = 1 << 1, // 2
  Polish = 1 << 2, // 4
  Russian = 1 << 3, // 8
}

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

export const BIT_LANGUAGE_MAP = getBitLanguageMap();

export function getSupportedLanguages(bitLanguage: number | string): Language[] {
  return BIT_LANGUAGE_MAP[typeof bitLanguage === 'string' ? parseInt(bitLanguage) : bitLanguage];
}

function getBitLanguageMap(): BitLanguageMap {
  return getLanguageCombinations().reduce((languageMap: BitLanguageMap, languages) => {
    const bitValue = languages.reduce((bitVal, language) => {
      bitVal = bitVal | SPINE_LANGUAGE_MAP[language];
      return bitVal;
    }, 0);
    languageMap[bitValue] = languages;
    return languageMap;
  }, {});
}

function getLanguageCombinations(): Language[][] {
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
