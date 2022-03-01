export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

export const DATABASE_URL = (() => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "The DATABASE_URL environment variable must be set in production"
      );
    }
    return process.env.DATABASE_URL;
  } else {
    return "postgres://postgres:ppooii12@localhost:5432/metwenty";
  }
})();

export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE
  ? parseInt(process.env.SESSION_MAX_AGE)
  : 60 * 60 * 24 * 30;

export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";

export const REDIS_URL = (() => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.REDIS_URL) {
      throw new Error(
        "The REDIS_URL environment variable must be set in production"
      );
    }
    return process.env.REDIS_URL;
  } else {
    return "redis://localhost:6379";
  }
})();
