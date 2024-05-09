# Define Base
FROM node:16-alpine AS base

FROM base AS base-with-dep
RUN apk add --update --no-cache openssl1.1-compat

FROM base-with-dep AS builder
WORKDIR /app

COPY package*.json ./
COPY .env   ./.env

RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && npm install \
    && apk del .gyp

#RUN npm install

COPY . .

RUN npm run build

FROM base-with-dep AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./dist/.env
COPY --from=builder /app/.env ./.env
RUN  mkdir ./avatars/

CMD [ "npm", "run", "start:prod" ]