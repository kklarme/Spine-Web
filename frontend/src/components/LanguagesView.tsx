import { createElement, FC } from 'react';
import { Language } from 'spine-api';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../constants';
import { useTranslation } from 'react-i18next';

export interface LanguagesViewProps {
  languages: Language[];
  className?: string;
  flagClassName?: string;
}

const LanguagesView: FC<LanguagesViewProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className={props.className || 'inline-flex space-x-2'}>
      {props.languages.map((language) =>
        createElement(LANGUAGE_COUNTRY_FLAG_MAP[language], {
          key: language,
          title: t(`language.${language}`),
          className: props.flagClassName || 'w-6 h-auto shadow',
        }),
      )}
    </div>
  );
};

export default LanguagesView;
