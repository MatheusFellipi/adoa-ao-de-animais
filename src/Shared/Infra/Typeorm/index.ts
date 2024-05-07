import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "math",
  password: "1234",
  database: "animals",
  entities: [`/src/**/**.entity{.ts,.js}`],
  migrations: [`src/shared/infra/typeorm/migrations/*{.ts,.js}`],
});