import { unescapeHtml } from '../../utilities';
import { SpineDateUtils } from '../../date/SpineDateUtils';

export interface RawReview {
  Username: string;
  Review: string;
  Date: string; // ex: 448076
  ReviewDuration: string; // in minutes
  Rating: string; // 1-5
  Duration: string; // in minutes
}

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export class Review {
  username: string;
  review: string;
  date: Date;
  reviewDuration: number;
  rating: ReviewRating;
  duration: number;

  constructor(review: RawReview) {
    this.username = unescapeHtml(review.Username);
    this.review = unescapeHtml(review.Rating);
    this.date = SpineDateUtils.parseLegacySpineDate(review.Date);
    this.reviewDuration = parseInt(review.ReviewDuration);
    this.rating = parseInt(review.Rating) as ReviewRating;
    this.duration = parseInt(review.Duration);
  }
}
