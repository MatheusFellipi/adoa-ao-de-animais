import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnRefreshTokenInAccount1718117362808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("accounts", [
            new TableColumn({
                name: "refresh_token",
                type: "text",
                isNullable: true,
                default: ""
            }),
         
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("accounts", "refresh_token");
    }

}
