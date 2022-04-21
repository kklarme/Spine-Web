import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { News, Project } from 'spine-api';

export interface NewsPageProps {}

const NewsPage: NextPage<NewsPageProps> = (props) => {
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
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <svg
              className="animate-spin h-12 w-12 text-accent-light"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        <div></div>
      </main>
    </div>
  );
};

export default NewsPage;
