import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { News, NewsTicker } from 'spine-api';
import LoadOverlay from '../components/LoadOverlay';
import NewsTickerList from '../components/news-ticker-list/NewsTickerList';
import NewsList from '../components/news-list/NewsList';
import { useSpineApi } from '../hooks/spine-api';
import JumpToStartButton from '../components/JumpToStartButton';

const NewsPage: NextPage = () => {
  const spineApi = useSpineApi();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    <div ref={scrollContainerRef} className="flex flex-col min-h-0 flex-grow overflow-auto">
      <Head>
        <title>Spine Web - News</title>
      </Head>

      <main className="h-full p-4">
        <div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-6">
          <div className="mb-2 lg:w-1/3 2xl:w-1/4">
            <h2 className="text-lg font-light mb-1">News Ticker</h2>
            <button
              className="leading-none text-accent-light underline underline-offset-2 mb-2 lg:hidden"
              onClick={() => setNewsTickerExpanded(!isNewsTickerExpanded)}
            >
              {isNewsTickerExpanded ? 'Hide' : 'Show'} news ticker
            </button>
            <div className={`${isNewsTickerExpanded ? 'block' : 'hidden'} lg:block`}>
              <NewsTickerList newsTickers={newsTickers} />
            </div>
          </div>
          <div className="pb-6">
            <h1 className="text-2xl font-light mb-2">News</h1>
            <NewsList news={news} />
          </div>
        </div>
        {isLoading && <LoadOverlay />}
        <JumpToStartButton className="fixed right-8 bottom-6 ml-auto block " containerRef={scrollContainerRef} />

      </main>
    </div>
  );
};

export default NewsPage;
