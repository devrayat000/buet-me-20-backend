export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

//   process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost/keystone-6-example`;

export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE) : 60 * 60 * 24 * 30;

export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*'