FROM node:alpine as builder
RUN apk update && apk add bash curl
WORKDIR /app
COPY package.json .
RUN yarn install --verbose
COPY . .
EXPOSE 4000