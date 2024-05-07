import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TokensTable1715092170910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "token",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "token", type: "varchar", isNullable: true },
                { name: "account_id", type: "int" },
                { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                { name: "expires_at", type: "timestamp" },
            ],
        }), true);

        await queryRunner.createForeignKey("token", new TableForeignKey({
            columnNames: ["account_id"],
            referencedTableName: "accounts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("token", "FK_account");
        await queryRunner.dropTable("token");
    }

}
