FROM node:16

WORKDIR /app

COPY . /app/

RUN npm install

ENV HOST 0.0.0.0
CMD ["npm", "run", "serve", "--", "--port", "8081"]