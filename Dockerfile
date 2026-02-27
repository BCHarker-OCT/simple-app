FROM node:22.11.0-alpine AS build
# Uncomment the next line if you want to use OCT base image
# FROM harbor.octanner.io/base/oct-node:20-alpine AS build

WORKDIR /app

COPY app/package*.json ./
RUN npm ci

COPY app/ ./
RUN npm install --no-save typescript
RUN npx tsc --project tsconfig.json
RUN npm prune --omit=dev

FROM node:22.11.0-alpine AS runtime

ENV NODE_ENV=production
ENV PORT=9000

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 9000

USER node

CMD ["node", "dist/app.js"]
