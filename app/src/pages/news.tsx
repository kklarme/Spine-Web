import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { News, NewsTicker } from 'spine-api';
import LoadOverlay from '../components/LoadOverlay';
import NewsTickerList from '../components/news-ticker-list/NewsTickerList';
import NewsList from '../components/news-list/NewsList';
import { useSpineApi } from '../hooks/spine-api';

const NewsPage: NextPage = () => {
  const spineApi = useSpineApi();

  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);
  const [newsTickers, setNewsTickers] = useState<NewsTicker[]>([]);

  const [isNewsTickerExpanded, setNewsTickerExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    spineApi
      .getNews()
      .then((result) => {
        setNews(result.value.news);
        setNewsTickers(result.value.newsTicker);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [spineApi]);

  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <Head>
        <title>Spine Web - News</title>
      </Head>

      <main className="h-full p-4">
        {isLoading && <LoadOverlay />}
        <div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-6">
          <div className="mb-2 lg:w-1/3">
            <button
              className="leading-none text-accent underline underline-offset-2 mb-2 lg:hidden"
              onClick={() => setNewsTickerExpanded(!isNewsTickerExpanded)}
            >
              {isNewsTickerExpanded ? 'Hide' : 'Show'} news ticker
            </button>
            <div className={`${isNewsTickerExpanded ? 'block' : 'hidden'} lg:block`}>
              <NewsTickerList newsTickers={newsTickers} />
            </div>
          </div>
          <div className="lg:w-2/3 pb-6">
            <NewsList news={news} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
