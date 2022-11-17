import { News } from './news';
import { NewsTicker } from './newsTicker';
import { GetNewsResponse } from '../endpoints';

export class NewsData {
  news: News[];
  newsTicker: NewsTicker[];

  constructor(newsResponse: GetNewsResponse) {
    this.news = newsResponse.News.map((news) => new News(news));
    this.newsTicker = newsResponse.NewsTicker.map((newsTicker) => new NewsTicker(newsTicker));
  }
}
