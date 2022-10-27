import { FC } from 'react';
import Head from 'next/head';
import DefaultLayoutTopBar from './DefaultLayoutTopBar';

const DefaultLayout: FC = (props) => {
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

      <DefaultLayoutTopBar />
      {props.children}
    </div>
  );
};

export default DefaultLayout;
