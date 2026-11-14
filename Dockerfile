FROM node:22.23.2-bookworm-slim AS build
WORKDIR /lab
COPY package.json package-lock.json ./
RUN npm ci
COPY apps ./apps
COPY tsconfig.json vite.classroom.config.ts vite.storefront.config.ts ./
RUN npm run build

FROM node:22.23.2-bookworm-slim AS runtime
WORKDIR /lab
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY shared ./shared
COPY config ./config

FROM runtime AS store
COPY services/store-api ./services/store-api
COPY content/es/campaign/fixtures.json ./content/es/campaign/fixtures.json
COPY --from=build /lab/dist/storefront ./dist/storefront
RUN mkdir -p /data/store && chown node:node /data/store
USER node
CMD ["node", "--import", "tsx", "services/store-api/server.ts"]

FROM runtime AS classroom
ENV PLAYWRIGHT_BROWSERS_PATH=/opt/browsers
RUN npx playwright install --with-deps chromium && chmod -R a+rX /opt/browsers
COPY services/classroom-api ./services/classroom-api
COPY services/scenario-runner ./services/scenario-runner
COPY content ./content
COPY --from=build /lab/dist/classroom ./dist/classroom
RUN mkdir -p /data/classroom && chown node:node /data/classroom
USER node
CMD ["node", "--import", "tsx", "services/classroom-api/server.ts"]
