import { MigrationInterface, QueryRunner } from "typeorm";

export class OrganizationIdInAddressTable1717171914578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE addresses 
            ADD organization_id INT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE addresses 
            DROP COLUMN organization_id;
        `);
    }

}
