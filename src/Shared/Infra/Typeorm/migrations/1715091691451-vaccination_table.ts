import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VaccinationTable1715091691451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "vaccinations",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true },
                { name: "name", type: "varchar", isNullable: false },
                { name: "description", type: "varchar", isNullable: false },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vaccinations");
    }

}
