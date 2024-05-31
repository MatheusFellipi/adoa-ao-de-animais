import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AdRelationship1717026066696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("animal_ad", new TableForeignKey({
            columnNames: ["animal_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "animals",
            onDelete: "CASCADE" 
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("animal_ad","FK_animal_ad_animal_id")
    }

}
