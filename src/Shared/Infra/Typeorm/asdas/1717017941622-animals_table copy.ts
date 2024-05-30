import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AnimalsTable1717017941622 implements MigrationInterface {

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
                        default: ""
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: true,
                        default: ""
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                        default: ""
                    },
                    {
                        name: "origin",
                        type: "varchar",
                        isNullable: true,
                        default: ""
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
                        default: ""
                    },
                    {
                        name: "birth_date",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "age",
                        type: "varchar",
                        isNullable: true,
                        default: ""
                    },
                    {
                        name: "microchip_code",
                        type: "varchar",
                        isNullable: true,
                        default: ""
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "update_at",
                        type: "timestamp",
                        default: ""
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
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
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
                        type: "int"
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
                        name: "update_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );

        // Create foreign keys
        await queryRunner.createForeignKey("animals", new TableForeignKey({
            columnNames: ["vaccination_card_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vaccination_cards",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("animals", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
        
        await queryRunner.createForeignKey("animals", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_vaccinations", new TableForeignKey({
            columnNames: ["vaccination_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vaccinations",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("relationship_vaccinations", new TableForeignKey({
            columnNames: ["vaccination_card_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "vaccination_cards",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        const animalTable = await queryRunner.getTable("animals");
        const relationshipVaccinationTable = await queryRunner.getTable("relationship_vaccinations");

        await queryRunner.dropForeignKeys("animals", animalTable.foreignKeys);
        await queryRunner.dropForeignKeys("relationship_vaccinations", relationshipVaccinationTable.foreignKeys);

        // Drop tables
        await queryRunner.dropTable("animals");
        await queryRunner.dropTable("vaccinations");
        await queryRunner.dropTable("relationship_vaccinations");
        await queryRunner.dropTable("vaccination_cards");
    }

}
