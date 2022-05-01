import { useContext } from 'react';
import { SpineApi } from 'spine-api';
import { SpineApiContext } from '../contexts/spine-api';

export function useSpineApi(): SpineApi {
  return useContext(SpineApiContext);
}
