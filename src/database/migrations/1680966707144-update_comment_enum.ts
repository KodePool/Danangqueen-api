import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCommentEnum1680966707144 implements MigrationInterface {
    name = 'UpdateCommentEnum1680966707144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "status" character varying NOT NULL DEFAULT 'in_review'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "status" integer NOT NULL DEFAULT '0'`);
    }

}
