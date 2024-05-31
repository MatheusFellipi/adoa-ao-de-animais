import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumnOrganizationTable1717175470565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE organizations 
        DROP COLUMN email;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE organizations
        ADD email INT NULL;
    `);
    }

}
