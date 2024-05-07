import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AccountsTable1715092028237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "accounts",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "email", type: "varchar", isUnique: true, isNullable: false },
                { name: "password", type: "varchar", isNullable: false },
                { name: "user_id", type: "int", isNullable: true },
                { name: "organization_id", type: "int", isNullable: true },
                { name: "last_login", type: "timestamp", isNullable: true },
            ],
        }), true);

        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
        }));

        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedTableName: "organizations",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("accounts", "FK_user");
        await queryRunner.dropForeignKey("accounts", "FK_organization");
        await queryRunner.dropTable("accounts");
    }

}
