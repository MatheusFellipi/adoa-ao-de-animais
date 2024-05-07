import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AnimalsRefactorTable1715091124762 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "animals",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "name", type: "varchar", length: "100", isNullable: false },
                { name: "description", type: "text", isNullable: false },
                { name: "size", type: "int", isNullable: false },
                { name: "gender", type: "int", isNullable: false },
                { name: "weight", type: "varchar", isNullable: false },
                { name: "age", type: "varchar", isNullable: false },
                { name: "microchip_code", type: "varchar", isNullable: false },
                { name: "birth_date", type: "timestamp", isNullable: false },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "update_at", type: "timestamp", default: "now()" }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("animals");
    }

}
