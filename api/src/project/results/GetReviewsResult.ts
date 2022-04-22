import { Result } from '../../Result';
import { GetReviewsResponse } from '../responses/GetReviewsResponse';
import { Review } from '../models/Review';

export class GetReviewsResult extends Result<GetReviewsResponse, Review[]> {
  protected convertValue(originalValue: GetReviewsResponse): Review[] {
    return originalValue.Reviews.map((review) => new Review(review));
  }
}
