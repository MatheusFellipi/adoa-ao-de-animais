import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationshipAddressForeignKeyTable1715088308023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys("relationship_addresses", [
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                columnNames: ["organizationId"],
                referencedColumnNames: ["id"],
                referencedTableName: "organizations",
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                columnNames: ["addressId"],
                referencedColumnNames: ["id"],
                referencedTableName: "addresses",
                onDelete: "CASCADE"
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("relationship_addresses", "FK_relationship_addresses_userId");
        await queryRunner.dropForeignKey("relationship_addresses", "FK_relationship_addresses_organizationId");
        await queryRunner.dropForeignKey("relationship_addresses", "FK_relationship_addresses_addressId");
    }
}
