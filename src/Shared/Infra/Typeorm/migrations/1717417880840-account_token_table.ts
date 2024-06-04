import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AccounttokensTable1717417880840 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create "accounts" table
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'organization_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'last_login',
                        type: 'timestamp',
                        default: "now()",
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        // Create "tokens" table
        await queryRunner.createTable(
            new Table({
                name: 'tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'account_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'expires_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        // Add foreign key for organization_id in accounts table
        await queryRunner.createForeignKey(
            'accounts',
            new TableForeignKey({
                columnNames: ['organization_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'organizations',
                onDelete: 'SET NULL',
            }),
        );

        // Add foreign key for user_id in accounts table
        await queryRunner.createForeignKey(
            'accounts',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
            }),
        );

        // Add foreign key for account_id in tokens table
        await queryRunner.createForeignKey(
            'tokens',
            new TableForeignKey({
                columnNames: ['account_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'accounts',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("accounts", "FK_accounts_organization_id");
        await queryRunner.dropForeignKey("accounts", "FK_accounts_user_id");
        await queryRunner.dropForeignKey("tokens", "FK_tokens_account_id");
        await queryRunner.dropTable('tokens');
        await queryRunner.dropTable('accounts');
    }

}
