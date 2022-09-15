FROM node

WORKDIR /gang-api/

RUN yarn global add nodemon

RUN apt update
RUN apt upgrade -y
RUN apt install postgresql-client -y

CMD ["./start.sh", "start:dev"]

EXPOSE 8080
