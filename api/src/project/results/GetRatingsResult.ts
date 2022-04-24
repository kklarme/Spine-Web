import { Result } from '../../Result';
import { GetRatingsResponse } from '../responses/GetRatingsResponse';
import { Ratings } from '../models/Ratings';

export class GetRatingsResult extends Result<GetRatingsResponse, Ratings> {
  getResultClass(): { new (originalValue: GetRatingsResponse): Ratings } {
    return Ratings;
  }
}
