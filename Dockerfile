# Adam Technical Services — Next.js 15 + Payload CMS production image.
# Single reliable image that builds the app and runs `next start`.
FROM node:22-bookworm-slim

WORKDIR /app

# openssl: required by Payload; the rest are common native-module deps.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies first (better layer caching).
COPY package.json package-lock.json ./
RUN npm ci

# Build. DATABASE_URI/PAYLOAD_SECRET are NOT required at build time (the config
# tolerates empty values); they are provided at runtime via the environment.
COPY . .
RUN npm run build

# Media is written to a mounted volume at runtime.
ENV PAYLOAD_MEDIA_DIR=/app/media
RUN mkdir -p /app/media

EXPOSE 3000
CMD ["npm", "run", "start"]
