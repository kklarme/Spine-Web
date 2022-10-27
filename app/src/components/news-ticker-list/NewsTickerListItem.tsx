import { FC } from 'react';
import { NewsTicker, NewsTickerType } from 'spine-api';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export interface NewsTickerListItemProps {
  newsTicker: NewsTicker;
}

const NewsTickerListItem: FC<NewsTickerListItemProps> = ({ newsTicker }) => {
  const { t } = useTranslation();
  const typeText = t(`newsTickerType.${newsTicker.type}`).toUpperCase();
  let content = newsTicker.name;
  if (newsTicker.version) {
    content += ` ${newsTicker.version}`;
  }

  return (
    <div className="flex justify-between items-center text-sm space-x-3 h-8">
      <p className="truncate">
        <span
          className={`inline-block text-xs px-2 py-0.5 w- rounded-full ${
            newsTicker.type === NewsTickerType.Release
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {typeText}
        </span>{' '}
        <Link href={`/project/${newsTicker.projectId}`}>
          <a title={content}>{content}</a>
        </Link>
      </p>
      <p className="text-gray-600 text-xs">{newsTicker.timestamp.toLocaleDateString()}</p>
    </div>
  );
};

export default NewsTickerListItem;
