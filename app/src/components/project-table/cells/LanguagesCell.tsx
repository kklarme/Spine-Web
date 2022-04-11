import { createElement, FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import { Language } from 'spine-api';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../../../constants';

const LanguagesCell: FC<ProjectCellProps<Language[]>> = memo(function LanguagesCell(props) {
  return (
    <div className="inline-flex space-x-2">
      {props.value.map((language) =>
        createElement(LANGUAGE_COUNTRY_FLAG_MAP[language], {
          key: language,
          title: props.t(`language.${language}`),
          className: 'w-6 h-auto shadow',
        }),
      )}
    </div>
  );
});

export default LanguagesCell;
