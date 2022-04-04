import { SpineApi } from 'spine-api';

const api = new SpineApi({
  serverUrl: process.env.SERVER_URL || '',
  credentials: {
    username: process.env.SERVER_USERNAME || '',
    password: process.env.SERVER_PASSWORD || '',
  },
});

export default api;
