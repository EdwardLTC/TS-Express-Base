import { MONGO_CONNECTION_STRING } from '@config';

export const dbConnection = {
  url: MONGO_CONNECTION_STRING,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
