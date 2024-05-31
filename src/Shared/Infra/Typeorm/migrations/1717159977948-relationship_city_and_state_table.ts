import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationshipCityAndStateTable1717159977948 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("addresses", new TableForeignKey({
            columnNames: ["city_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cities",
            onDelete: "CASCADE" 
        }));

        
        await queryRunner.createForeignKey("cities", new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "states",
            onDelete: "CASCADE" 
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("addresses", "FK_addresses_city_id");
        await queryRunner.dropForeignKey("cities", "FK_cities_state_id");
    }

}
