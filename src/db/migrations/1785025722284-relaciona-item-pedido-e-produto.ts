import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1785025722284 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1785025722284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "produto_id" uuid`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_f06b1a00d5d32cbd45cd05b445f" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_f06b1a00d5d32cbd45cd05b445f"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "produto_id"`);
    }

}
