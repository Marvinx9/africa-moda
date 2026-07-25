import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaTabelas1785006246633 implements MigrationInterface {
  name = 'CriaTabelas1785006246633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "produto_imagens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produto_id" uuid, CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" character varying(100) NOT NULL, "nome" character varying(100) NOT NULL, "valor" integer NOT NULL, "quantidade" integer NOT NULL, "descricao" character varying(255) NOT NULL, "categoria" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produto_caracteristicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produto_id" uuid, CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "senha" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_f3397a03210b9e153cb34e78e7f" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_679f75c20903e5ca30e995c7b82" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_679f75c20903e5ca30e995c7b82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_f3397a03210b9e153cb34e78e7f"`,
    );
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TABLE "produto_caracteristicas"`);
    await queryRunner.query(`DROP TABLE "produtos"`);
    await queryRunner.query(`DROP TABLE "produto_imagens"`);
  }
}
