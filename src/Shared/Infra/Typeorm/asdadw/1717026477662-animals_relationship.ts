import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AnimalsRelationship1717026477662 implements MigrationInterface {

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("animals","FK_animals_user_id")
        await queryRunner.dropForeignKey("animals","FK_animals_organization_id")
    }

}
