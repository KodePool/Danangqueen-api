import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelations1680856761052 implements MigrationInterface {
    name = 'updateRelations1680856761052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_a6772c596aa56971322fae9e6fd"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "postsId"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "postsId" integer`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_a6772c596aa56971322fae9e6fd" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
