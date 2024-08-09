import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PhotoContactsLinksTable1717179934885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create contacts table
        await queryRunner.createTable(
            new Table({
                name: "contacts",
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
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
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
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "url",
                        type: "varchar"
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

        // Create photos table
        await queryRunner.createTable(
            new Table({
                name: "photos",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "animal_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "url",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
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
