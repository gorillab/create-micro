FROM node:9-alpine

LABEL name "{{name}}"

RUN ["mkdir", "/app"]

COPY . /app

WORKDIR /app

RUN ["yarn", "--production"]

ENV PORT 80

CMD ["yarn", "serve"]
