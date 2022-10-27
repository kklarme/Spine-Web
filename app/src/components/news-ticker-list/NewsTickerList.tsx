import { FC } from 'react';
import { NewsTicker } from 'spine-api';
import NewsTickerListItem from './NewsTickerListItem';

export interface NewsTickerListProps {
  newsTickers: NewsTicker[];
}

const NewsTickerList: FC<NewsTickerListProps> = (props) => {
  return (
    <div className="divide-y border-t border-b">
      {props.newsTickers.map((newsTicker, index) => (
        <NewsTickerListItem key={index} newsTicker={newsTicker} />
      ))}
    </div>
  );
};

export default NewsTickerList;
