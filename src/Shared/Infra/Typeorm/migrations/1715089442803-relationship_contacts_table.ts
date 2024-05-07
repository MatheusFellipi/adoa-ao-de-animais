import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RelationshipContactsTable1715089442803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create relationship_contacts table
        await queryRunner.createTable(new Table({
            name: "relationship_contacts",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "user_id", type: "int", isNullable: true },
                { name: "organization_id", type: "int", isNullable: true },
                { name: "contact_id", type: "int" }
            ]
        }), true);

        await queryRunner.createForeignKey("relationship_contacts", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_contacts", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_contacts", new TableForeignKey({
            columnNames: ["contact_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "contacts",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("relationship_contacts", "user_id");
        await queryRunner.dropForeignKey("relationship_contacts", "organization_id");
        await queryRunner.dropForeignKey("relationship_contacts", "contact_id");
        await queryRunner.dropTable("relationship_contacts");
    }
}
