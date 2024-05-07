import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StateTable1715056805694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "states",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "acronyms", type: "varchar" },
                { name: "name", type: "varchar" }
            ]
        }), true); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("states");
    }

}
