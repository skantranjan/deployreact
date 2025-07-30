# Build Stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build
# RUN npm install serve  
# Install serve locally

# Deploy Stage
FROM node:20-alpine AS deploy
LABEL org.opencontainers.image.source=https://github.com/consumer-tech/sdp-ui

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3000
USER node
# CMD ["npx", "serve", "-s", "build", "-l", "3000"]
CMD ["node", "index.js"]