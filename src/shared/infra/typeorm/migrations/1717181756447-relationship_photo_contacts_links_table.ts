import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationshipPhotoContactsLinksTable1717181756447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("contacts", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE" 
        }));


        await queryRunner.createForeignKey("links", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE" 
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("contacts","FK_contacts_user_id")
        await queryRunner.dropForeignKey("links","FK_links_user_id")
    }
}
