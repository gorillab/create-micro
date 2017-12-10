FROM node:9-alpine

LABEL name "{{name}}"

EXPOSE 9000

RUN mkdir /app

COPY . /app

RUN npm install --production

WORKDIR /app

CMD ["yarn", "start"]
