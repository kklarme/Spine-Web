import { SpineNews } from '../models/News';
import { SpineNewsTicker } from '../models/NewsTicker';

export interface RequestAllNewsResponse {
  News: SpineNews[];
  NewsTicker: SpineNewsTicker[];
}
