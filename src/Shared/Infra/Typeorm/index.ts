import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "math",
  password: "1234",
  database: "animals",
  entities: ["src/Modules/**/entity/*.js"],
  migrations: ["src/Shared/Infra/Typeorm/Migrations/*.ts"],
  migrationsTableName: "custom_migration_table",
});