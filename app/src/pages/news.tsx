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
        <div className="">
          <div className="mb-2">
            <button
              className="leading-none text-accent underline underline-offset-2"
              onClick={() => setNewsTickerExpanded(!isNewsTickerExpanded)}
            >
              {isNewsTickerExpanded ? 'Hide' : 'Show'} news ticker
            </button>
            <div className={`${isNewsTickerExpanded ? 'block' : 'hidden'} mt-2`}>
              <NewsTickerList newsTickers={newsTickers} />
            </div>
          </div>
          <NewsList news={news} />
        </div>
      </main>
    </div>
  );
};

export default NewsPage;
