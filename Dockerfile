FROM node:14-alpine3.11
COPY . /app
WORKDIR /app
EXPOSE 3000
RUN npm install
RUN npm run build
CMD [ "npm", "run", "start:prod" ]