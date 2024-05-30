import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AnimalsVaccinationRelationship1717026669275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("animals", new TableForeignKey({
            columnNames: ["vaccination_card_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vaccination_cards",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_vaccinations", new TableForeignKey({
            columnNames: ["vaccination_card_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vaccination_cards",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_vaccinations", new TableForeignKey({
            columnNames: ["vaccination_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vaccinations",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("animals", "FK_animals_vaccination_card_id");
        await queryRunner.dropForeignKey("relationship_vaccinations", "FK_relationship_vaccinations_vaccination_card_id");
        await queryRunner.dropForeignKey("relationship_vaccinations", "FK_relationship_vaccinations_vaccination_id");
    }

}
