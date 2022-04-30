import { FC } from 'react';
import { NewsTicker } from 'spine-api';
import { useTranslation } from 'react-i18next';

export interface NewsTickerListItemProps {
  newsTicker: NewsTicker;
}

const NewsTickerListItem: FC<NewsTickerListItemProps> = ({ newsTicker }) => {
  const { t } = useTranslation();
  const typeText = t(`newsTickerType.${newsTicker.type}`).toUpperCase();
  return (
    <li className="flex justify-between text-sm">
      <p className="truncate">
        [{typeText}] {newsTicker.name}
        {newsTicker.version && <span> {newsTicker.version}</span>}
      </p>
      <span>{newsTicker.timestamp.toLocaleDateString()}</span>
    </li>
  );
};

export default NewsTickerListItem;
