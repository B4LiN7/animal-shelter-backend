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
COPY docker.env .env
COPY . .

RUN pnpm prisma generate
RUN pnpm build

FROM build as deploy

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD pnpm prisma migrate deploy && pnpm prisma db seed && node dist/src/main.js