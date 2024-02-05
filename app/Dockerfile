FROM node:20-alpine as builder

USER node
WORKDIR /home/node

COPY package.json ./
COPY tsconfig.json ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .
RUN yarn run build \
    && yarn install --production

# ---

FROM node:20-alpine

ENV NODE_ENV production
ARG VERSION
ENV VERSION=$VERSION

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/main.js"]