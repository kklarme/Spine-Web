import { Language, LanguageMap } from './Language';
import { LANGUAGE_BIT_MAP } from './constants';

export class SpineLanguageUtils {
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
