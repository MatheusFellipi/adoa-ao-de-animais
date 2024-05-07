import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RelationshipLinksTable1715089432984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "relationship_links",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "user_id", type: "int", isNullable: true },
                { name: "organization_id", type: "int", isNullable: true },
                { name: "link_id", type: "int" }
            ]
        }), true);

        await queryRunner.createForeignKey("relationship_links", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_links", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_links", new TableForeignKey({
            columnNames: ["link_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "links",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("relationship_links", "user_id");
        await queryRunner.dropForeignKey("relationship_links", "organization_id");
        await queryRunner.dropForeignKey("relationship_links", "link_id");
        await queryRunner.dropTable("relationship_links");
    }


}
