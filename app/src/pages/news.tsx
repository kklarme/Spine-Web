import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { News } from 'spine-api';
import LoadOverlay from '../components/LoadOverlay';

const NewsPage: NextPage = () => {
  const { i18n } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    setLoading(true);
  }, [i18n.language]);

  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - News</title>
      </Head>

      <main className="h-full">
        {isLoading && <LoadOverlay />}
        <div></div>
      </main>
    </div>
  );
};

export default NewsPage;
