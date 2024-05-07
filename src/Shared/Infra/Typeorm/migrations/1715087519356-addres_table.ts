import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddresTable1715087519356 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "addresses",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "city_id", type: "int"},
                { name: "street", type: "varchar", isNullable: false },
                { name: "postal_code", type: "varchar", isNullable: false },
                { name: "district", type: "varchar", isNullable: false },
                { name: "complement", type: "text", isNullable: false },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" }
            ]
        }), true);

        await queryRunner.createForeignKey("addresses", new TableForeignKey({
            columnNames: ["city_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cities",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("addresses", "FK_addresses_cityId");
        await queryRunner.dropTable("addresses");
    }
}
