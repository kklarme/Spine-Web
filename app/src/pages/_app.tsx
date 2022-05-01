import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../translations';
import DefaultLayout from '../layout/DefaultLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SpineApiContext } from '../contexts/spine-api';
import { Language, SpineApi } from 'spine-api';
import { SERVER_URL } from '../constants';

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [spineApi, setSpineApi] = useState(
    new SpineApi({
      serverUrl: SERVER_URL,
      language: locale as Language,
    }),
  );

  // on locale change, update spineApi
  useEffect(() => {
    setSpineApi(
      new SpineApi({
        serverUrl: SERVER_URL,
        language: locale as Language,
      }),
    );
    void i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <SpineApiContext.Provider value={spineApi}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SpineApiContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  await i18n.changeLanguage(appContext.ctx.locale);
  return { ...appProps };
};

export default MyApp;
