import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  entities: ["src/Modules/**/entity/*.js"],
  migrations: ["src/Shared/Infra/Typeorm/Migrations/*.ts"],
  migrationsTableName: "custom_migration_table",
});