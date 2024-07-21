FROM node:20.14.0-alpine3.20 as build

WORKDIR /usr/src/app

COPY . .

EXPOSE 3010

CMD npm run start -- -p 3010
