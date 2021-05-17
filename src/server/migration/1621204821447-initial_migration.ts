import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1621204821447 implements MigrationInterface {
    name = 'initialMigration1621204821447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "merchant" ("guid" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" integer NOT NULL, "logo" character varying NOT NULL, "dateCreated" character varying NOT NULL, "publishedState" boolean NOT NULL, "brands" jsonb NOT NULL, "products" jsonb NOT NULL, "merchant" character varying NOT NULL, "commissionFee" character varying NOT NULL, "contactEmail" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "publishedDate" character varying NOT NULL, "publishedBy" jsonb NOT NULL, "companyDescription" character varying NOT NULL, CONSTRAINT "PK_ad7c36a5a01d18bf320ac49f61d" PRIMARY KEY ("guid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "merchant"`);
    }

}
