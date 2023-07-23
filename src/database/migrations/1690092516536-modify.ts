import { MigrationInterface, QueryRunner } from "typeorm";

export class Modify1690092516536 implements MigrationInterface {
    name = 'Modify1690092516536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ADD "post_id" integer`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_ca0ed9873891665fff3d9d39cc2" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_ca0ed9873891665fff3d9d39cc2"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "post_id"`);
    }

}
