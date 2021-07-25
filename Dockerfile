FROM node:12
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install 
COPY server.js ./
COPY . .
RUN npm run build
CMD [ "node", "./server.js" ]