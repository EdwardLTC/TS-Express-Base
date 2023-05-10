import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE, MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET } = process.env;
export const jwtExpirySeconds = 1000 * 60 * 60 * 24; // 1 day
