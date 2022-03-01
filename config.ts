export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

export const DATABASE_URL = process.env.DATABASE_URL ?? 'postgres://postgres:ppooii12@localhost:5432/metwenty';

export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE) : 60 * 60 * 24 * 30;

export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*'