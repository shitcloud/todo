FROM node:16-alpine as client-build

WORKDIR /build/client

COPY client/package*.json client/yarn.lock ./

RUN yarn

COPY client/ ./

RUN yarn build

FROM node:16-alpine as server-build

WORKDIR /build/server

COPY server/package*.json server/yarn.lock ./

RUN yarn

COPY server/ ./

FROM node:16-alpine

COPY --from=client-build /build/client/dist /app/client
COPY --from=server-build /build/server /app/server

WORKDIR /app/server

EXPOSE 3000

CMD [ "yarn", "start" ]
