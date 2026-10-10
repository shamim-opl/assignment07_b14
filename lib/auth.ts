import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";
import { DatabaseSync } from "node:sqlite";

// Postgres in production (DATABASE_URL), local SQLite file when developing.
const database = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new DatabaseSync("./bazardor.sqlite");

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

const options = {
  database,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // after sign up the user is sent to the sign in page
    minPasswordLength: 8,
  },
  socialProviders,
  plugins: [nextCookies()],
};

export const auth = betterAuth(options);

// Creates / updates the auth tables on first use, so no CLI step is needed on deploy.
export const authReady = getMigrations(options).then(({ runMigrations }) => runMigrations());
