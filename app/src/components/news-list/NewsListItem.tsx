import { FC, useState } from 'react';
import { News } from 'spine-api';

export interface NewsListItemProps {
  newsEntry: News;
}

const startImageRegex = /<p\s*align=center>\s*<img.*[/]?>\s*<[/]p>\s*(<br[/]?>)?/gi;

const NewsListItem: FC<NewsListItemProps> = ({ newsEntry }) => {
  const [content, setContent] = useState(newsEntry.body);
  const match = startImageRegex.exec(content);
  if (match) {
    setContent(content.substring(match.index + match[0].length));
  }
  return (
    <article className="border rounded-md bg-gray-100">
      <header className="border-b px-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">{newsEntry.title}</p>
          <span className="text-gray-600 text-xs">{newsEntry.timestamp.toLocaleDateString()}</span>
        </div>
        {newsEntry.images.length && (
          <div className="">
            <img
              className="mx-auto"
              src={`/api/images/news/images/${newsEntry.images[0].file}`}
              alt={newsEntry.title}
            />
          </div>
        )}
      </header>
      <p className="px-4 py-4" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default NewsListItem;
