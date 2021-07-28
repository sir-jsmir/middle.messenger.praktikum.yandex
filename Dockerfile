FROM node:12-alpine
WORKDIR /var/www
COPY ["package.json", "./"]
COPY ./ ./
RUN npm install 
EXPOSE 3000
CMD npm run start