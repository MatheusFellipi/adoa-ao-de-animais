import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Addnameatt1716994614210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'links',
            new TableColumn({
                name: 'name',
                type: 'varchar', 
                isNullable: true, 
            })
        );

        await queryRunner.addColumn(
            'contacts',
            new TableColumn({
                name: 'name',
                type: 'varchar', 
                isNullable: true, 
            })
        );

        await queryRunner.addColumn(
            'contacts',
            new TableColumn({
                name: 'type',
                type: 'int', 
                isNullable: true, 
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('links', 'name');
        await queryRunner.dropColumn('contacts', 'name');
        await queryRunner.dropColumn('contacts', 'type');
    }

}
