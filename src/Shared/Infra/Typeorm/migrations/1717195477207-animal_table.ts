import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AnimalTable1717195477207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create animals table
        await queryRunner.createTable(
            new Table({
                name: "animals",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: true,

                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: true,

                    },
                    {
                        name: "vaccination_card_id",
                        type: "int",
                        isNullable: true,

                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "origin",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "size",
                        type: "int",
                    },
                    {
                        name: "gender",
                        type: "int",
                    },
                    {
                        name: "weight",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "birth_date",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "age",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "microchip_code",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: 'now()'
                    }
                ]
            })
        );

        // Create vaccinations table
        await queryRunner.createTable(
            new Table({
                name: "vaccinations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false
                    }
                ]
            })
        );

        // Create vaccination_cards table
        await queryRunner.createTable(
            new Table({
                name: "vaccination_cards",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: 'now()'
                    }
                ]
            })
        );

        // Create relationship_vaccinations table
        await queryRunner.createTable(
            new Table({
                name: "relationship_vaccinations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "dose",
                        type: "varchar"
                    },
                    {
                        name: "vaccination_date",
                        type: "date"
                    },
                    {
                        name: "crmv",
                        type: "varchar"
                    },
                    {
                        name: "vaccination_id",
                        type: "int"
                    },
                    {
                        name: "vaccination_card_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("animals");
        await queryRunner.dropTable("vaccinations");
        await queryRunner.dropTable("vaccination_cards");
        await queryRunner.dropTable("relationship_vaccinations");
    }

}
