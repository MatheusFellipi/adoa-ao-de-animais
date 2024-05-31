import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddressCityStateTable1717113973993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // states
        await queryRunner.createTable(
            new Table({
                name: "states",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "acronyms",
                        type: "varchar"
                    },
                    {
                        name: "name",
                        type: "varchar"
                    }
                ]
            })
        );

        // cities
        await queryRunner.createTable(
            new Table({
                name: "cities",
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
                        type: "varchar"
                    },
                    {
                        name: "state_id",
                        type: "int"
                    }
                ]
            })
        );

        // addresses
        await queryRunner.createTable(
            new Table({
                name: "addresses",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "city_id",
                        type: "int"
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "street",
                        type: "varchar"
                    },
                    {
                        name: "postal_code",
                        type: "varchar"
                    },
                    {
                        name: "district",
                        type: "varchar"
                    },
                    {
                        name: "complement",
                        type: "text"
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("addresses");
        await queryRunner.dropTable("cities");
        await queryRunner.dropTable("states");
    }
}
