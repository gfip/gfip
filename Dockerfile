FROM node:8.15.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

RUN npm i -g nodemon

COPY . /usr/src/app

EXPOSE 5000

CMD [ "npm", "start"]