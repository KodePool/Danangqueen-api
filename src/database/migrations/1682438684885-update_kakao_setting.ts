import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateKakaoSetting1682438684885 implements MigrationInterface {
    name = 'UpdateKakaoSetting1682438684885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakao"`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakaoLink" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakaoId" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakaoId"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "kakaoLink"`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "kakao" character varying NOT NULL DEFAULT ''`);
    }

}
