import { FC } from 'react';
import { Review } from 'spine-api';
import ReviewListItem from './ReviewListItem';

export interface ReviewsListProps {
  reviews: Review[];
}

const ReviewList: FC<ReviewsListProps> = (props) => {
  return (
    <div>
      {props.reviews.map((review, index) => (
        <ReviewListItem key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
