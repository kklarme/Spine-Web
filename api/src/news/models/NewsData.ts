import { News } from './News';
import { NewsTicker } from './NewsTicker';
import { GetNewsResponse } from '../responses/GetNewsResponse';

export class NewsData {
  news: News[];
  newsTicker: NewsTicker[];

  constructor(newsResponse: GetNewsResponse) {
    this.news = newsResponse.News.map((news) => new News(news));
    this.newsTicker = newsResponse.NewsTicker.map((newsTicker) => new NewsTicker(newsTicker));
  }
}
