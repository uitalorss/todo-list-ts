import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCreatedAt1702424688339 implements MigrationInterface {
    name = 'FixCreatedAt1702424688339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_token" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_token" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '2023-12-12 18:54:51.893536+00'`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET DEFAULT '2023-12-08 01:38:10.813029+00'`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DEFAULT '2023-12-08 01:38:10.813029+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2023-12-08 01:38:10.813029+00'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2023-12-08 01:38:10.813029+00'`);
    }

}
