import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1759026335751 implements MigrationInterface {
    name = 'Default1759026335751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form_templates" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "version" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dda93f70be71cb4a2e496b5ae49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template_fields" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "field_type" character varying NOT NULL, "options" jsonb, "unit" character varying, "is_required" boolean NOT NULL DEFAULT false, "order" integer NOT NULL, "template_section_id" integer, CONSTRAINT "PK_84616dabf8bbf0a34afa3f69222" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template_sections" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "form_template_id" integer, CONSTRAINT "PK_98dfac771db4c25e1e6ec3b3019" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'PENDING_APPROVAL', "submitted_at" TIMESTAMP NOT NULL DEFAULT now(), "approved_at" TIMESTAMP, "form_template_id" integer, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report_answers" ("id" SERIAL NOT NULL, "value" text NOT NULL, "report_id" uuid, "template_field_id" integer, CONSTRAINT "PK_3f5aae5ad112ecb640f343419f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'field_technician'`);
        await queryRunner.query(`ALTER TABLE "template_fields" ADD CONSTRAINT "FK_7b4f7457421e754c64723a8e676" FOREIGN KEY ("template_section_id") REFERENCES "template_sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template_sections" ADD CONSTRAINT "FK_721e8a46f09473bd6aa6451883f" FOREIGN KEY ("form_template_id") REFERENCES "form_templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_82c3f2a09a37f2296940b8375f0" FOREIGN KEY ("form_template_id") REFERENCES "form_templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report_answers" ADD CONSTRAINT "FK_a59a16d00df1ae7e9c990c6c1b1" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report_answers" ADD CONSTRAINT "FK_05f7f393daced08b3af3f3e5275" FOREIGN KEY ("template_field_id") REFERENCES "template_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report_answers" DROP CONSTRAINT "FK_05f7f393daced08b3af3f3e5275"`);
        await queryRunner.query(`ALTER TABLE "report_answers" DROP CONSTRAINT "FK_a59a16d00df1ae7e9c990c6c1b1"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_82c3f2a09a37f2296940b8375f0"`);
        await queryRunner.query(`ALTER TABLE "template_sections" DROP CONSTRAINT "FK_721e8a46f09473bd6aa6451883f"`);
        await queryRunner.query(`ALTER TABLE "template_fields" DROP CONSTRAINT "FK_7b4f7457421e754c64723a8e676"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'read_only'`);
        await queryRunner.query(`DROP TABLE "report_answers"`);
        await queryRunner.query(`DROP TABLE "reports"`);
        await queryRunner.query(`DROP TABLE "template_sections"`);
        await queryRunner.query(`DROP TABLE "template_fields"`);
        await queryRunner.query(`DROP TABLE "form_templates"`);
    }

}
