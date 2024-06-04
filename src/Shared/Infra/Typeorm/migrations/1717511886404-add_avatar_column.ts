import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarColumn1717511886404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE organizations
            ADD avatar INT NULL;
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE organizations 
            DROP COLUMN avatar;
        `);
    }

}
