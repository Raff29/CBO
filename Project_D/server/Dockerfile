FROM node:latest

WORKDIR /app

EXPOSE 8080

ADD .. /app/

RUN npm init -y

RUN npm install express body-parser mysql nodemon cors 