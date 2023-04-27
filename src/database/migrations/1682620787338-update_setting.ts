import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSetting1682620787338 implements MigrationInterface {
    name = 'UpdateSetting1682620787338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakaoLink"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakaoId"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "is_active" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakao_link" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakao_id" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "telegram_id" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "telegram_id"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakao_id"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakao_link"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakaoId" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakaoLink" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "email" character varying NOT NULL DEFAULT 'admin@gmail.com'`);
    }

}
