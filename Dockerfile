FROM node:16
WORKDIR /var/www
COPY ["package.json", "./"]
RUN npm install 
COPY .  .
CMD [ "node", "./server.js" ]