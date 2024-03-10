FROM node:slim

ENV NODE_ENV development

WORKDIR /helloworld

COPY . .

RUN npm install

CMD ["node", "index.js"]

EXPOSE 9009
