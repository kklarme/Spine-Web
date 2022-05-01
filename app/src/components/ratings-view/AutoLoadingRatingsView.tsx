import { FC, useEffect, useState } from 'react';
import RatingsView from './RatingsView';
import { Ratings } from 'spine-api';
import { useSpineApi } from '../../hooks/spine-api';

export interface AutoLoadingRatingsViewProps {
  projectId: number;
}

const AutoLoadingRatingsView: FC<AutoLoadingRatingsViewProps> = (props) => {
  const spineApi = useSpineApi();
  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Ratings>({
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
  });

  useEffect(() => {
    spineApi
      .getRatings(props.projectId)
      .then((result) => {
        setRatings(result.value);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.projectId, spineApi]);

  return (
    <div>
      <RatingsView ratings={ratings} />
    </div>
  );
};

export default AutoLoadingRatingsView;
