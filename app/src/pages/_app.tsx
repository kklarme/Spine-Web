import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../translations';
import DefaultLayout from '../layout/DefaultLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  useEffect(() => {
    i18n.changeLanguage(locale).then(() => {
      // make sure to await the language change
    });
  });

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  await i18n.changeLanguage(appContext.ctx.locale);
  return { ...appProps };
};

export default MyApp;
