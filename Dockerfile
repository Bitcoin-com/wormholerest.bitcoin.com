FROM node:10-alpine

MAINTAINER Sam Bengtson <sam.bengtson@gmail.com>

RUN apk get update
RUN apk get upgrade
RUN apk add git python alpine-sdk

WORKDIR /project
ADD package.json ./
RUN npm install

ADD . ./

CMD node app.js
