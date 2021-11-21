FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /var/www/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /var/www/app
USER node
CMD ["npm", "start"]
