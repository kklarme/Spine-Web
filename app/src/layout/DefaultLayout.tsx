import { FC } from 'react';
import Link from 'next/link';
import LanguageSelect from '../components/LanguageSelect';
import { Language } from 'spine-api';
import { useRouter } from 'next/router';

const DefaultLayout: FC = (props) => {
  const router = useRouter();

  const setLanguage = async (language: Language) => {
    await router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale: language,
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-14 flex items-center flex-shrink-0 justify-between px-4 bg-gray-500 text-white">
        <a
          href="https://clockwork-origins.com/de/spine/"
          target="_blank"
          rel="noreferrer"
          className="block h-full p-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Spine Logo" className="max-h-full object-contain" />
        </a>

        <Link href="/" passHref={true}>
          <a target="_blank" rel="noreferrer">
            <span className="font-bold text-xl text-black">Spine Web</span>
          </a>
        </Link>

        <LanguageSelect language={router.locale as Language} setLanguage={setLanguage} />
      </div>
      {/* for overflow flex container add below: flex flex-col min-h-0 overflow-auto */}
      {props.children}
    </div>
  );
};

export default DefaultLayout;
