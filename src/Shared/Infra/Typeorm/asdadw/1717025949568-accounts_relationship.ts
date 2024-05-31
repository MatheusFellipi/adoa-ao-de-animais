import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AccountsRelationship1717025949568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE" 
        }));

        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE" 
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("accounts", "FK_accounts_user_id");
        await queryRunner.dropForeignKey("accounts", "FK_accounts_organization_id");
    }

}
