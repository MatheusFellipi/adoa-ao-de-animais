import { DataSource, DataSourceOptions,  } from "typeorm"
import { SeederOptions } from "typeorm-extension"

import { singleton } from "tsyringe"

import { db } from "@shared/config/db"
import { MainSeeder } from "./seeds/Main.seed"


@singleton()
class DbContext {
  private __connection: DataSource | null = null
  public connection(): DataSource {
    if (this.__connection != null) {
      return this.__connection
    }
    this.__connection = new DataSource(
      {
        ...db,
        entities: [`src/modules/**/entities/**.entity.ts`],
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
        seeds: [MainSeeder],
        migrationsRun: true
      } as DataSourceOptions & SeederOptions
    )
    return this.__connection
  }
}

export const dbContext = new DbContext().connection()