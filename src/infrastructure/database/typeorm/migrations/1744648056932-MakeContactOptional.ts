import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeContactOptional1744648056932 implements MigrationInterface {
  name = 'MakeContactOptional1744648056932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patients" ALTER COLUMN "contactPhone" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "contactPhone" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctors" ALTER COLUMN "contactPhone" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "patients" ALTER COLUMN "contactPhone" SET NOT NULL`);
  }
}
