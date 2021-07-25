FROM node:12
WORKDIR /var/www
COPY ["package.json", "./"]
COPY ./ ./
RUN npm install 
EXPOSE 3000
CMD [ "node", "./server.js" ]