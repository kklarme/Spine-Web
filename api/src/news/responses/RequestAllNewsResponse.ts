import { RawNews } from '../models/News';
import { RawNewsTicker } from '../models/NewsTicker';

export interface RequestAllNewsResponse {
  News: RawNews[];
  NewsTicker: RawNewsTicker[];
}
