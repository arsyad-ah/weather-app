FROM node:18.17.1-buster-slim

ARG FRONTEND_FOLDER

ENV APP_ROOT /opt/${FRONTEND_FOLDER}
WORKDIR $APP_ROOT

RUN apt-get update && apt-get install -y --no-install-recommends git

COPY package*.json .
RUN npm install && rm package*.json

CMD ["/bin/sh", "./start.sh"]
