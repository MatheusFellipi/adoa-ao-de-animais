const dbPost = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "math",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "animals",
};

const dbTest = {
  type: "sqlite",
  database: ":memory:",
};

export const db = process.env.NODE_ENV === "test" ? dbTest : dbPost;
