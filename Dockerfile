FROM ubuntu:18.04
WORKDIR /var/www
COPY ./ ./
RUN npm install 
EXPOSE 3000
CMD npm run start