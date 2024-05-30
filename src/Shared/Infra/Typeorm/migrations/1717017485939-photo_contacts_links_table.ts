import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PhotoContactsLinksTable1717017485939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create contacts table
        await queryRunner.createTable(
            new Table({
                name: "contacts",
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
                        default: -1
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: true,
                        default: -1
                    },
                    {
                        name: "type",
                        type: "int"
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "phone",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    }
                ]
            })
        );

        // Create links table
        await queryRunner.createTable(
            new Table({
                name: "links",
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
                        default: -1
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: true,
                        default: -1
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "link",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    }
                ]
            })
        );

        // Create photos table
        await queryRunner.createTable(
            new Table({
                name: "photos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "animal_id",
                        type: "int",
                        isNullable: true,
                        default: -1
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: true,
                        default: -1
                    },
                    {
                        name: "url",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contacts");
        await queryRunner.dropTable("links");
        await queryRunner.dropTable("photos");
    }
}
