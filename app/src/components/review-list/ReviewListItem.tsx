import { FC } from 'react';
import { Review } from 'spine-api';

export interface ReviewsListItemProps {
  review: Review;
}

const ReviewListItem: FC<ReviewsListItemProps> = (props) => {
  return <div>{JSON.stringify(props.review, undefined, 2)}</div>;
};

export default ReviewListItem;
