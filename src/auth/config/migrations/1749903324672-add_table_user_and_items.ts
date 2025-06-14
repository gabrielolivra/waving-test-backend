import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableUserAndItems1749903324672 implements MigrationInterface {
    name = 'AddTableUserAndItems1749903324672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP DEFAULT now(), "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "image" character varying NOT NULL DEFAULT 'https://placehold.co/400', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
