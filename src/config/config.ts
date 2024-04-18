import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || "3001",
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  PGCONN: process.env.PGCONN,
  NODE_ENV: process.env.NODE_ENV,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};
