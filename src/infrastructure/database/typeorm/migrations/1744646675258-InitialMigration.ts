import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1744646675258 implements MigrationInterface {
  name = 'InitialMigration1744646675258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "contactPhone" character varying(20) NOT NULL, "contactEmail" character varying(100), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medical_procedures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctor_id" uuid NOT NULL, "patient_id" uuid NOT NULL, "procedure_name" character varying(255) NOT NULL, "procedure_date" TIMESTAMP NOT NULL, "procedure_value" numeric(10,2) NOT NULL, "payment_status" "public"."medical_procedures_payment_status_enum" NOT NULL, "denial_reason" character varying(255), CONSTRAINT "PK_9a6533904f4bef5cbe247c89f42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "crm" character varying(20) NOT NULL, "specialty" character varying(100) NOT NULL, "contactPhone" character varying(20) NOT NULL, "contactEmail" character varying(100), CONSTRAINT "UQ_d7e8212b37dd4e61e996d7289cd" UNIQUE ("crm"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors_patients" ("doctor_id" uuid NOT NULL, "patient_id" uuid NOT NULL, CONSTRAINT "PK_1f601f5e7b7b38e5b087b8dcb62" PRIMARY KEY ("doctor_id", "patient_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_b85c48c5d46ed7958c8c123dd4" ON "doctors_patients" ("doctor_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_667dc598706b61f891f5c8cb5e" ON "doctors_patients" ("patient_id") `);
    await queryRunner.query(
      `ALTER TABLE "medical_procedures" ADD CONSTRAINT "FK_7db0166da8699a4c9afc6076359" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_procedures" ADD CONSTRAINT "FK_9f38eccdfc8ed33107d441f1227" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors_patients" ADD CONSTRAINT "FK_b85c48c5d46ed7958c8c123dd4f" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors_patients" ADD CONSTRAINT "FK_667dc598706b61f891f5c8cb5e2" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctors_patients" DROP CONSTRAINT "FK_667dc598706b61f891f5c8cb5e2"`);
    await queryRunner.query(`ALTER TABLE "doctors_patients" DROP CONSTRAINT "FK_b85c48c5d46ed7958c8c123dd4f"`);
    await queryRunner.query(`ALTER TABLE "medical_procedures" DROP CONSTRAINT "FK_9f38eccdfc8ed33107d441f1227"`);
    await queryRunner.query(`ALTER TABLE "medical_procedures" DROP CONSTRAINT "FK_7db0166da8699a4c9afc6076359"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_667dc598706b61f891f5c8cb5e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b85c48c5d46ed7958c8c123dd4"`);
    await queryRunner.query(`DROP TABLE "doctors_patients"`);
    await queryRunner.query(`DROP TABLE "doctors"`);
    await queryRunner.query(`DROP TABLE "medical_procedures"`);
    await queryRunner.query(`DROP TABLE "patients"`);
  }
}
