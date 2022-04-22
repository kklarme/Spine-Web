import { GetNewsResponse } from '../responses/GetNewsResponse';
import { Result } from '../../Result';
import { NewsData } from '../models/NewsData';

export class GetNewsResult extends Result<GetNewsResponse, NewsData> {
  resultClass = NewsData;
}