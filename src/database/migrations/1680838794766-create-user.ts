import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1680838794766 implements MigrationInterface {
    name = 'createUser1680838794766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "gender" boolean NOT NULL DEFAULT true, "avatar" character varying NOT NULL DEFAULT '', "full_name" character varying NOT NULL DEFAULT '', "status" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
