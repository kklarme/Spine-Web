import { SpineNews } from '../models/News';
import { SpineNewsTicker } from '../models/NewsTicker';

export interface GetNewsResponse {
  News: SpineNews[];
  NewsTicker: SpineNewsTicker[];
}
