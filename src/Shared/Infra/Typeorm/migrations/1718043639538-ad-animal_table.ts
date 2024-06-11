import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AdAnimalTable1718043639538 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "animal_ad",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "extra",
                    type: "text",
                    isNullable: true
                },
                
                {
                    name: "type",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "animal_id",
                    type: "int",
                    isNullable: true
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["animal_id"],
                    referencedTableName: "animals",
                    referencedColumnNames: ["id"]
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("animal_ad");
    }
}
