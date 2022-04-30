import { FC } from 'react';
import { NewsTicker } from 'spine-api';
import NewsTickerListItem from './NewsTickerListItem';

export interface NewsTickerListProps {
  newsTickers: NewsTicker[];
}

const NewsTickerList: FC<NewsTickerListProps> = (props) => {
  return (
    <ul>
      {props.newsTickers.map((newsTicker, index) => (
        <NewsTickerListItem key={index} newsTicker={newsTicker} />
      ))}
    </ul>
  );
};

export default NewsTickerList;
