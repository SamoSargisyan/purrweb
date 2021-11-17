FROM node:12.19.0-alpine3.9 AS development
WORKDIR /var/www/app
COPY package*.json ./
COPY .env ../
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:12.19.0-alpine3.9 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /var/www/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY .env ../
COPY --from=development /var/www/app/dist ./dist

CMD ["node", "dist/main"]
