import { createElement, FC, FormEvent } from 'react';
import { Language, LANGUAGE_BIT_MAP, Project } from 'spine-api';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { UseFiltersInstanceProps } from 'react-table';

export interface LanguageFilterProps {
  filter?: Language[];
  setFilter: UseFiltersInstanceProps<Project>['setFilter'];
}

const LanguageFilter: FC<LanguageFilterProps> = (props) => {
  const { t } = useTranslation();
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    props.setFilter('supportedLanguages', (languages?: Language[]) => {
      languages = languages?.slice() || [];
      const input = e.target as HTMLInputElement;
      const language = input.value as Language;
      if (!input.checked) {
        languages = languages.filter((lang) => lang !== language);
      } else {
        languages.push(language);
        // sort because the order matters due to "text" comparison of arrays when using react-table
        languages.sort((a, b) => {
          return LANGUAGE_BIT_MAP[a] - LANGUAGE_BIT_MAP[b];
        });
      }
      return languages.length === 0 ? undefined : languages;
    });
  };
  return (
    <div className="flex flex-col border">
      <span className="self-center font-medium">Languages</span>
      <div className="flex items-center space-x-3">
        {Object.values(Language).map((language) => {
          const flagComponent = createElement(LANGUAGE_COUNTRY_FLAG_MAP[language], {
            className: 'inline-flex w-6 h-auto shadow -mt-0.5',
          });
          const id = `language_${language}_input`;
          return (
            <span
              key={language}
              className="flex items-center space-x-1"
              title={t(`language.${language}`)}
            >
              <input
                type="checkbox"
                id={id}
                checked={props.filter?.includes(language) ?? false}
                value={language}
                onChange={onChange}
              />
              <label htmlFor={id}>{flagComponent}</label>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageFilter;
