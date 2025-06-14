import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableCart1749909319644 implements MigrationInterface {
    name = 'AddTableCart1749909319644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "quantity" numeric NOT NULL, "userId" uuid, "productId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "image_url" character varying NOT NULL DEFAULT 'https://placehold.co/400'`);
        await queryRunner.query(`ALTER TABLE "item" ADD "stock_quantity" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "stock_quantity"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "image" character varying NOT NULL DEFAULT 'https://placehold.co/400'`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
