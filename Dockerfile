FROM node:20.18.0-alpine3.20 AS base

FROM base AS libs
RUN apk add --no-cache libcap
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=libs /app/node_modules ./node_modules
COPY . .
RUN ls -la
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
ENV PORT=3000
CMD npm run start:prod
