import { createContext } from 'react';
import { SpineApi } from 'spine-api';
import { SERVER_URL } from '../constants';

export const SpineApiContext = createContext(new SpineApi({ serverUrl: SERVER_URL }));
