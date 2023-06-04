import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIntroduction1685895070782 implements MigrationInterface {
    name = 'AddIntroduction1685895070782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" ADD "introduction" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "introduction"`);
    }

}
