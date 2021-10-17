FROM nginx:1.19.6-alpine as base
LABEL name="nateteam/tyrant-admin"

FROM node:12.20.1-alpine as build
WORKDIR /app
RUN apk add yarn
RUN npm install react-scripts -g --silent

COPY ./package.json ./
RUN yarn install --prod --silent

COPY . .
RUN yarn run build

FROM base
COPY --from=build /app/build /usr/share/nginx/html
COPY ./docker/site.conf /etc/nginx/conf.d/default.conf