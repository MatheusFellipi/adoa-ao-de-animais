import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RelationshipPhotosTable1715091490304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "relationship_photo",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "animal_id", type: "int", isNullable: true },
                { name: "organization_id", type: "int", isNullable: true },
                { name: "photo_id", type: "int" }
            ]
        }), true);

        await queryRunner.createForeignKey("relationship_photo", new TableForeignKey({
            columnNames: ["animal_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "animals",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_photo", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_photo", new TableForeignKey({
            columnNames: ["photo_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "photos",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("relationship_photo", "animal_id");
        await queryRunner.dropForeignKey("relationship_photo", "organization_id");
        await queryRunner.dropForeignKey("relationship_photo", "photo_id");
        await queryRunner.dropTable("relationship_photo");
    }

}
