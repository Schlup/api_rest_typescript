import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1759026684492 implements MigrationInterface {
    name = 'Default1759026684492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('planning', 'in_progress', 'completed', 'on_hold', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "project_code" character varying NOT NULL, "client_name" character varying NOT NULL, "location" character varying NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'planning', "start_date" date, "end_date" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_11b19c7d40d07fc1a4e167995e1" UNIQUE ("project_code"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_users" ("project_id" uuid NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_2bdf8b14b34ac191f9fa6c67672" PRIMARY KEY ("project_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b7d782db86a3dc1bd3b7eaed1f" ON "projects_users" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_274bd757ae91379bf033a2dacc" ON "projects_users" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "reports" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "reports" ADD "project_id" uuid`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_bbe3b065e71d60f9d51ad236225" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_users" ADD CONSTRAINT "FK_b7d782db86a3dc1bd3b7eaed1fd" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects_users" ADD CONSTRAINT "FK_274bd757ae91379bf033a2daccd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_users" DROP CONSTRAINT "FK_274bd757ae91379bf033a2daccd"`);
        await queryRunner.query(`ALTER TABLE "projects_users" DROP CONSTRAINT "FK_b7d782db86a3dc1bd3b7eaed1fd"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_bbe3b065e71d60f9d51ad236225"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_274bd757ae91379bf033a2dacc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7d782db86a3dc1bd3b7eaed1f"`);
        await queryRunner.query(`DROP TABLE "projects_users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
    }

}
