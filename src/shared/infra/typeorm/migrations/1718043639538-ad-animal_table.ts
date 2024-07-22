import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AdAnimalTable1718043639538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animal_ad",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "extra",
            type: "text",
            isNullable: true,
          },

          {
            name: "type",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "animal_id",
            type: "varchar",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["animal_id"],
            referencedTableName: "animals",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animal_ad");
  }
}
