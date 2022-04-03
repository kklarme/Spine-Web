import { createElement, FC } from 'react';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../constants';
import { useTranslation } from 'react-i18next';

const DefaultLayout: FC = (props) => {
  const { i18n } = useTranslation();
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-14 flex items-center flex-shrink-0 justify-between px-4 bg-gray-500 text-white">
        <a href="https://clockwork-origins.com/de/spine/" target="_blank" className="block h-full p-1">
          <img className="max-h-full object-contain" src="/logo.png" />
        </a>

        <a href="/">
          <p className="font-bold text-xl text-black">Spine Web</p>
        </a>

        <div className="flex items-center space-x-2">
          {Object.entries(LANGUAGE_COUNTRY_FLAG_MAP).map(([language, flagComponent]) => {
            const isActive = i18n.language.split('-')[0] === language;
            return (
              <button
                className={`flex border-b-2 ${
                  isActive ? 'border-primary-500' : 'border-transparent'
                }`}
                key={language}
                onClick={() => i18n.changeLanguage(language)}
              >
                {createElement(flagComponent, {
                  className: 'w-6 h-6',
                })}
              </button>
            );
          })}
        </div>
      </div>
      {/* for flex container add below: flex flex-col min-h-0 */}
      {/*<div className="overflow-auto px-4 py-2">{props.children}</div>*/}
      <div className="overflow-auto">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
