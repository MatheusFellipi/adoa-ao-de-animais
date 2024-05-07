import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CityTable1715057782281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cities",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "state_id", type: "int" },
                { name: "name", type: "varchar" }
            ]
        }), true);

        await queryRunner.createForeignKey("cities", new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "states",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("cities", "FK_cities_stateId");
        await queryRunner.dropTable("cities");
    }
}