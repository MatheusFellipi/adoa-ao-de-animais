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
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'super_admin',
                        type: 'bool',
                        default: false
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
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'account_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'expires_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        // Add foreign key for user_id in accounts table
        const foreignKeyUser = new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        });
        await queryRunner.createForeignKey('accounts', foreignKeyUser);

        // Add foreign key for account_id in tokens table
        const foreignKeyAccount = new TableForeignKey({
            columnNames: ['account_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'accounts',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('tokens', foreignKeyAccount);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys in the reverse order they were added
        const tableTokens = await queryRunner.getTable('tokens');
        const foreignKeyAccount = tableTokens.foreignKeys.find(fk => fk.columnNames.indexOf('account_id') !== -1);
        await queryRunner.dropForeignKey('tokens', foreignKeyAccount);

        const tableAccounts = await queryRunner.getTable('accounts');
        const foreignKeyUser = tableAccounts.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        await queryRunner.dropForeignKey('accounts', foreignKeyUser);

        // Drop tables
        await queryRunner.dropTable('tokens');
        await queryRunner.dropTable('accounts');
    }
}
