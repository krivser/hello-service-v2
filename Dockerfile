FROM node:7 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm install dotenv && npm i express pg
WORKDIR /usr/src/app
COPY /src/*.js /usr/src/app/

FROM node:7-alpine AS release
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/package.json ./
RUN npm install --only=production && npm install dotenv && npm i express pg && rm -rf node_modules
COPY --from=base /usr/src/app ./
EXPOSE 8080
ENTRYPOINT ["node", "server.js"]