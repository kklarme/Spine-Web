import { FC } from 'react';
import { News } from 'spine-api';

export interface NewsListItemProps {
  newsEntry: News;
}

function sanitizeBody(body: string): string {
  const startImageRegex = /<p\s*align=center>\s*<img.*[/]?>\s*<[/]p>\s*(<br[/]?>)?/gi;
  const match = startImageRegex.exec(body);
  if (match) {
    return body.substring(match.index + match[0].length);
  }
  return body;
}

const NewsListItem: FC<NewsListItemProps> = ({ newsEntry }) => {
  return (
    <article className="border rounded shadow-sm">
      <header className="bg-gray-100 border-b px-6 py-3 flex items-center justify-between space-x-6">
        <h3 className="text-lg font-bold">{newsEntry.title}</h3>
        <span className="text-gray-600 text-xs">{newsEntry.timestamp.toLocaleDateString()}</span>
      </header>
      <section className="px-6 py-3">
        {!!newsEntry.images.length && (
          <img
            className="mx-auto mb-3"
            src={`/api/images/news/images/${newsEntry.images[0].file}`}
            alt={newsEntry.title}
          />
        )}
        <p
          className="overflow-x-auto prose"
          dangerouslySetInnerHTML={{ __html: sanitizeBody(newsEntry.body) }}
        />
      </section>
    </article>
  );
};

export default NewsListItem;
