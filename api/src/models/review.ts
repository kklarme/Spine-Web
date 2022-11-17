import { unescapeHtml } from '../utilities';
import dayjs from 'dayjs';

export interface SpineReview {
  Username: string;
  Review: string;
  Date: string; // ex: 448076
  ReviewDuration: string; // in minutes
  Rating: string; // 1-5
  Duration: string; // in minutes
}

export const ReviewRating = [1, 2, 3, 4, 5] as const;
export type ReviewRating = keyof typeof ReviewRating;

export const SPINE_REVIEW_DATE_START = dayjs('1970-01-01');

export function parseReviewDate(date: string | number): Date {
  const dayDifference = typeof date === 'string' ? parseInt(date) : date;
  return SPINE_REVIEW_DATE_START.clone()
    .add(dayDifference / 24)
    .toDate();
}

export function parseReviewRating(rating: unknown): ReviewRating | undefined {
  return ReviewRating.find((_rating) => rating === _rating);
}

export class Review {
  username: string;
  review: string;
  date: Date;
  reviewDuration: number;
  rating: ReviewRating | null;
  duration: number;

  constructor(review: SpineReview) {
    this.username = unescapeHtml(review.Username);
    this.review = unescapeHtml(review.Rating);
    this.date = parseReviewDate(review.Date);
    this.reviewDuration = parseInt(review.ReviewDuration);
    this.rating = parseReviewRating(review.Rating) || null;
    this.duration = parseInt(review.Duration);
  }
}
