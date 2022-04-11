import { RawProject } from './Project';
import { RawPackage } from './Package';
import { RawPlayedProject } from './PlayedProject';
import { RawReview } from './Review';

export interface RequestAllProjectsResponse {
  Projects: RawProject[];
  PlayedProjects?: RawPlayedProject[];
  Packages: RawPackage[];
}

export interface GetRatingsResponse {
  Rating1: string;
  Rating2: string;
  Rating3: string;
  Rating4: string;
  Rating5: string;
}

export interface GetReviewsResponse {
  Reviews: RawReview[];
}
