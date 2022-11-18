# Gang ganG frontend

This project is hosted on https://jamilettel.com

This is a React web application that uses Typescript.

## Configuration

The server uses environment variables for configuration. This includes the URL of the API.

You can use a `.env` file: copy the `.env.example` and edit the values.

## Starting the project

To start the server in production mode, you will need the `serve` command. You can install
with npm:

```bash
npm i -g serve
```

You can start the project with the following commands:

```bash
cp .env.example .env
vim .env # edit the environment variables
npm install
npm run build
serve -s build
```

You can then access your sever on [http://localhost:3000]()
