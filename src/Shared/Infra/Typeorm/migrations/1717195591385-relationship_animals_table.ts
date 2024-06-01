import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationshipAnimalsTable1717195591385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("animals", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE" 
        }));

        await queryRunner.createForeignKey("animals", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE" 
        }));

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
        await queryRunner.dropForeignKey("animals","FK_animals_user_id")
        await queryRunner.dropForeignKey("animals","FK_animals_organization_id")
    }

}
