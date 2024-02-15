FROM node:20-alpine as base

WORKDIR /app

RUN npm i -g pnpm

FROM base as dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM dependencies as build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY .envdocker .env
COPY . .

RUN pnpm prisma generate
#RUN pnpm prisma migrate dev --name init
RUN pnpm build

FROM build as deploy

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD pnpm prisma migrate deploy && pnpm node dist/src/main.js
#CMD [ "node", "dist/src/main.js" ]