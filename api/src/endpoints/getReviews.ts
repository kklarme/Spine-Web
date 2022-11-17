import { Result } from '../result';
import { Review, SpineReview } from '../models';

export class GetReviewsDto {
  ProjectID: string | number;

  constructor(id: string | number) {
    this.ProjectID = id;
  }
}

export interface GetReviewsResponse {
  Reviews: SpineReview[];
}

export class GetReviewsResult extends Result<GetReviewsResponse, Review[]> {
  protected convertValue(originalValue: GetReviewsResponse): Review[] {
    return originalValue.Reviews.map((review) => new Review(review));
  }
}
