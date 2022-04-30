import { FC } from 'react';
import { News } from 'spine-api';
import NewsListItem from './NewsListItem';

export interface NewsListProps {
  news: News[];
}

const NewsList: FC<NewsListProps> = (props) => {
  return (
    <div className="space-y-6">
      {props.news.map((newsEntry, index) => (
        <NewsListItem key={index} newsEntry={newsEntry} />
      ))}
    </div>
  );
};

export default NewsList;
