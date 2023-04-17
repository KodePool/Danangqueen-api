import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSetting1681745058429 implements MigrationInterface {
    name = 'UpdateSetting1681745058429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "order" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "view_auto_increment" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "name" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "kakao" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "email" SET DEFAULT 'admin@gmail.com'`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "phone" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "address" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "describe" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "view" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "view" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "describe" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "address" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "phone" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "email" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "kakao" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "view_auto_increment"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "address"`);
    }

}
