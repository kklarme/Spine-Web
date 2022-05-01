import { FC } from 'react';
import { Ratings } from 'spine-api';

export interface RatingsViewProps {
  ratings: Ratings;
}

const RatingsView: FC<RatingsViewProps> = (props) => {
  return <div>{JSON.stringify(props.ratings, undefined, 2)}</div>;
};

export default RatingsView;
