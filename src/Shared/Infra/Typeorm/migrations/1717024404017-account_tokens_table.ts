import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AccountTokensTable1717024404017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "accounts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "organization_id",
                    type: "int",
                    isNullable:true,
                    default: -1
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable:true,
                    default: -1
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "last_login",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "tokens",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "token",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "account_id",
                    type: "int"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "expires_at",
                    type: "timestamp"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["account_id"],
                    referencedTableName: "accounts",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tokens");
        await queryRunner.dropTable("accounts");
    }

}
