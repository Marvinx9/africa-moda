import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaPedidoItemPedido1785015319590 implements MigrationInterface {
    name = 'RelacionaPedidoItemPedido1785015319590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedido_id" uuid, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_255f27dddc079e0ebe610d349e7" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_255f27dddc079e0ebe610d349e7"`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
    }

}
