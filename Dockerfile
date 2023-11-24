FROM  node:18-alpine3.17 AS build
WORKDIR /app
COPY . /app

RUN npm install
ENV CI=false
RUN npm run build

FROM ubuntu:23.10
RUN apt-get update
RUN apt-get install nginx -y
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 8081
CMD [ "nginx", "-g", "daemon off;" ]
