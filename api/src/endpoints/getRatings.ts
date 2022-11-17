import { Result } from '../result';
import { Ratings } from '../models';

export class GetRatingsDto {
  ProjectID: string | number;

  constructor(id: string | number) {
    this.ProjectID = id;
  }
}

export interface GetRatingsResponse {
  Rating1: string;
  Rating2: string;
  Rating3: string;
  Rating4: string;
  Rating5: string;
}

export class GetRatingsResult extends Result<GetRatingsResponse, Ratings> {
  getResultClass(): { new (originalValue: GetRatingsResponse): Ratings } {
    return Ratings;
  }
}
