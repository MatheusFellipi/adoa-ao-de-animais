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
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                        isNullable: true,

                    },
                    {
                        name: "vaccination_card_id",
                        type: "varchar",
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
                        type: "INTEGER",
                    },
                    {
                        name: "gender",
                        type: "INTEGER",
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
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: 'CURRENT_TIMESTAMP',
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
                        type: "varchar",
                        isPrimary: true,
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
                        type: "varchar",
                        isPrimary: true,
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

        // Create dose table
        await queryRunner.createTable(
            new Table({
                name: "dose",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "description",
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
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "vaccination_card_id",
                        type: "varchar",
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
        await queryRunner.dropTable("dose");
    }

}
