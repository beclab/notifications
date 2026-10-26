FROM node:26.12.1-alpine AS server_dist

WORKDIR /server_dist

# Only copy over the packages files of all required packages.
# This will ensure that we don't have to install all dependencies
# again if any source files change.
COPY ../package*.json tsconfig.json tsconfig.build.json ./
# Install dependencies and bootstrap packages
RUN npm ci --unsafe-perm

# Now copy over source files and assets
COPY ../src ./src
COPY ../prisma ./prisma
COPY ../tsconfig.json ./tsconfig.json
COPY ../webpack.config.js ./webpack.config.js

RUN npm run generate
RUN npm run build

FROM node:26.12.1-alpine

EXPOSE 3010

WORKDIR /settings-server


COPY --from=server_dist /server_dist/dist/node_modules ./node_modules
COPY --from=server_dist /server_dist/dist/package.json ./package.json

RUN npm install

COPY --from=server_dist /server_dist/dist/main.js ./main.js
COPY --from=server_dist /server_dist/dist/prisma ./prisma


CMD ["sh", "-c", "npx prisma migrate deploy && npm run server"]


