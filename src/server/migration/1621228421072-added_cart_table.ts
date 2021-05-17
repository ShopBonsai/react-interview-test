import {MigrationInterface, QueryRunner} from "typeorm";

export class addedCartTable1621228421072 implements MigrationInterface {
    name = 'addedCartTable1621228421072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionId" character varying NOT NULL, "products" jsonb NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
