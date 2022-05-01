import { FC, useEffect, useState } from 'react';
import { Review } from 'spine-api';
import { useSpineApi } from '../../hooks/spine-api';
import ReviewList from './ReviewList';

export interface AutoLoadingReviewsListProps {
  projectId: number;
}

const AutoLoadingReviewList: FC<AutoLoadingReviewsListProps> = (props) => {
  const spineApi = useSpineApi();
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    spineApi
      .getReviews(props.projectId)
      .then((result) => {
        setReviews(result.value);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.projectId, spineApi]);

  return (
    <div>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default AutoLoadingReviewList;
