import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostContentNull1682351941185 implements MigrationInterface {
    name = 'UpdatePostContentNull1682351941185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP COLUMN "describe"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "describe" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "settings" ADD "address" character varying NOT NULL DEFAULT ''`);
    }

}
