## AFRICA MODA

Uma loja virtual com funcionalidades de:  
USUARIO  
PRODUTO  
PEDIDO  
Desenvolvido com Node 20.19.4  
Api faz uso do banco de dados Postgres + TypeORM

Base das variáveis de ambiente no .env.example

Migrações versionada para criação de tabelas  
para criar migrações a partir das entidades

```
npm run typeorm migration:generate src/db/migrations/<nome-da-migracao>
```

para executar as migrações e criar as tabelas no banco de dados

```
npm run typeorm migration:run
```

caso queira desfazer a ultima migração

```
npm run typeorm migration:revert
```

caso queira verificar quais migrations foram executadas

```
npm run typeorm migration:show
```

instale as dependẽncias

```
npm install
```

rode o projeto

```
npm run start:dev
```
