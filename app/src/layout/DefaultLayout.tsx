import { FC } from 'react';
import Link from 'next/link';
import LanguageSelect from '../components/LanguageSelect';
import { Language } from 'spine-api';
import { useRouter } from 'next/router';
import Head from 'next/head';

const DefaultLayout: FC = (props) => {
  const router = useRouter();

  const setLanguage = async (language: Language) => {
    await router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale: language,
    });
  };

  return (
    <div className="flex flex-col max-h-screen h-screen">
      <Head>
        <meta name="description" content="Unofficial web client for Spine" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#871313" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#871313" />
      </Head>

      <div className="h-14 flex items-center flex-shrink-0 justify-between px-4 bg-gray-500 shadow">
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
      <div className="flex flex-col min-h-0 overflow-auto flex-grow">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
