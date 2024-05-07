import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RelationshipVaccinationsTable1715091867354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "relationship_vaccinations",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "dose", type: "varchar", isNullable: false },
                { name: "vaccination_date", type: "timestamp", isNullable: false, default: "now()" },
                { name: "crmv", type: "varchar", isNullable: false },
                { name: "vaccination_id", type: "int" }, 
                { name: "vaccination_card_id", type: "int" },
            ],
        }), true);

        await queryRunner.createForeignKey("relationship_vaccinations", new TableForeignKey({
            columnNames: ["vaccination_id"],
            referencedTableName: "vaccinations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("relationship_vaccinations", new TableForeignKey({
            columnNames: ["vaccination_card_id"],
            referencedTableName: "vaccination_cards",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("relationship_vaccinations", "FK_vaccination");
        await queryRunner.dropForeignKey("relationship_vaccinations", "FK_vaccinationCard");
        await queryRunner.dropTable("relationship_vaccinations");
    }

}
