import { GetRatingsResponse } from '../../responses';

export class Ratings {
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;

  constructor(response: GetRatingsResponse) {
    this.rating1 = parseInt(response.Rating1);
    this.rating2 = parseInt(response.Rating2);
    this.rating3 = parseInt(response.Rating3);
    this.rating4 = parseInt(response.Rating4);
    this.rating5 = parseInt(response.Rating5);
  }
}
