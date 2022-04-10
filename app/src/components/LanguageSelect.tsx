import { Language } from 'spine-api';
import { createElement, FC } from 'react';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../constants';

export interface LanguageSelectProps {
  language: Language;
  setLanguage: (language: Language) => void;
  components?: Record<Language, JSX.Element>;
}

const LanguageSelect: FC<LanguageSelectProps> = (props) => {
  const components = props.components || LANGUAGE_COUNTRY_FLAG_MAP;
  return (
    <div className="flex items-center space-x-2">
      {Object.entries(components).map(([language, flagComponent]) => {
        const isActive = props.language.split('-')[0] === language;
        return (
          <button
            className={`flex items-center h-6 border-b-2 ${
              isActive ? 'border-accent' : 'border-transparent'
            }`}
            key={language}
            onClick={() => props.setLanguage(language as Language)}
          >
            {createElement(flagComponent, {
              className: 'w-6 h-auto shadow',
            })}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelect;
