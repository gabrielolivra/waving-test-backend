import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablesToApp1749936697362 implements MigrationInterface {
    name = 'AddTablesToApp1749936697362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" "public"."order_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
    }

}
