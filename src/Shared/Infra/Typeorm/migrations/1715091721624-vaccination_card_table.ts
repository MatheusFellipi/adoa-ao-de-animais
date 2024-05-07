import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class VaccinationCardTable1715091721624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "vaccination_cards",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "animal_id", type: "int", isNullable: true },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
            ],
        }), true);

        await queryRunner.createForeignKey("vaccination_cards", new TableForeignKey({
            columnNames: ["animal_id"],
            referencedTableName: "animals",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vaccination_cards");
    }

}
