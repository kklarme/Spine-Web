import { createElement, FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MAIN_NAVIGATION_ITEMS } from '../navigation';
import { useTranslation } from 'react-i18next';
import { MenuIcon } from '@heroicons/react/solid';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../constants';

export interface DefaultLayoutTopBarProps {}

const DefaultLayoutTopBar: FC<DefaultLayoutTopBarProps> = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row flex-shrink-0 px-4 bg-gray-500 shadow py-3">
      <div className="flex justify-between">
        <Link href="/">
          <a>
            <h3 className="text-xl font-medium">Spine Web</h3>
          </a>
        </Link>
        <button
          className="border p-1 rounded border-black md:hidden"
          onClick={() => setExpanded(!isExpanded)}
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`${
          isExpanded ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row md:items-center md:ml-8 md:space-x-4`}
      >
        {MAIN_NAVIGATION_ITEMS.map((navigationItem) => (
          <div
            key={navigationItem.path}
            className={`${navigationItem.path === router.pathname ? 'text-accent-dark' : ''}`}
          >
            <Link href={navigationItem.path}>
              <a>{t(navigationItem.label)}</a>
            </Link>
          </div>
        ))}
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} md:block ml-auto`}>
        <div className="flex items-center space-x-2">
          {Object.entries(LANGUAGE_COUNTRY_FLAG_MAP).map(([language, flagComponent]) => {
            const isActive = router.locale?.split('-')[0] === language;
            return (
              <Link key={language} href={router.route} locale={language}>
                <a
                  className={`flex items-center h-6 border-b-2 ${
                    isActive ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  {createElement(flagComponent, {
                    className: 'w-6 h-auto shadow',
                  })}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayoutTopBar;
