import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColmunAddres1715195783683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.addColumn(
            'addresses',
            new TableColumn({
                name: 'user_id',
                type: 'int', 
                isNullable: true, 
            })
        );

        
        await queryRunner.addColumn(
            'addresses',
            new TableColumn({
                name: 'organization_id',
                type: 'int', 
                isNullable: true, 
            })
        );

        
        await queryRunner.createForeignKey(
            'addresses',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users', 
                referencedColumnNames: ['id'], 
                onDelete: 'CASCADE', 
            })
        );

        
        await queryRunner.createForeignKey(
            'addresses',
            new TableForeignKey({
                columnNames: ['organization_id'],
                referencedTableName: 'organizations', 
                referencedColumnNames: ['id'], 
                onDelete: 'CASCADE', 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('addresses', 'FK_addresses_user_id');
        await queryRunner.dropForeignKey('addresses', 'FK_addresses_organization_id');
        await queryRunner.dropColumn('addresses', 'userId');
        await queryRunner.dropColumn('addresses', 'organization_id');
    }


}
