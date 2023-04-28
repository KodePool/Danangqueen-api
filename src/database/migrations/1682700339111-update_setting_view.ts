import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSettingView1682700339111 implements MigrationInterface {
    name = 'UpdateSettingView1682700339111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "view"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "view_auto_increment"`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "total_view" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "yesterday_view" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "today_view" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "max_view" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "reservation" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "reservation_auto_increment" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "reservation_auto_increment"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "reservation"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "max_view"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "today_view"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "yesterday_view"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "total_view"`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "view_auto_increment" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "order" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "view" integer NOT NULL DEFAULT '0'`);
    }

}
