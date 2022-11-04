# Gang ganG backend

This project is an Express JS server that uses typescript. It connects to a PostgreSQL server.

## Database

You have to setup PostgreSQL database. You can do that with the following command:

```bash
docker run -e POSTGRES_PASSWORD=gang -e POSTGRES_DB=gang -e POSTGRES_USER=gang -e POSTGRES_HOST_AUTH_METHOD=trust -p5432:5432 postgres
```

Any values you put as password, db, user will have to be added to the env files in the [pre-start](./src/pre-start/) directory.

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
