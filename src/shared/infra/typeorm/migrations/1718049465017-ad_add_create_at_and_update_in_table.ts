import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AdAddCreateAtAndUpdateInTable1718049465017 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("animal_ad", [
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP"
            }),
            new TableColumn({
                name: "updated_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP"
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("animal_ad", "created_at");
        await queryRunner.dropColumn("animal_ad", "updated_at");
    }

}
