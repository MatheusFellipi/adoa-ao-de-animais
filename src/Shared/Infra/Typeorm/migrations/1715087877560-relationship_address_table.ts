import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RelationshipAddressTable1715087877560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "relationship_addresses",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "userId", type: "int", isNullable: true },
                { name: "organizationId", type: "int", isNullable: true },
                { name: "addressId", type: "int" }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("relationship_addresses");
    }

}
