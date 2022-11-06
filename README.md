# Gang ganG backend

This project is an Express JS server that uses typescript. It connects to a PostgreSQL server.

## Database

You have to setup PostgreSQL database. You can do that with the following command:

```bash
docker run -e POSTGRES_PASSWORD=gang -e POSTGRES_DB=gang -e POSTGRES_USER=gang -e POSTGRES_HOST_AUTH_METHOD=trust -p5432:5432 postgres
```

Any values you put as password, db, user will have to be added to the env files in the [pre-start](./src/pre-start/) directory.

To change the current database, you'll need to modify the schema.prisma file and then do the following command:

```bash
npx prisma migrate dev --name nom_de_la_migration
```
You can create an sql file in order to later revert the database to a previously working one

```bash
npx prisma migrate diff \
 --from-schema-datamodel prisma/schema.prisma \
 --to-schema-datasource prisma/schema.prisma \
 --script > down.sql
```

To revert the database to a previously working one you can do the following command:

```bash
npx prisma db execute --file ./down.sql --schema prisma/schema.prisma 
```

## Starting the project

You can start the project with the following commands:

```bash
cp .env.example .env
vim .env # edit the .env adding the url of your database
npm install
npx prisma migrate dev
npm run build
npm run start
```

You can then access your sever on [http://localhost:8080]()

## Manage the Database

