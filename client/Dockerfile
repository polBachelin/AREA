FROM node:16

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0

CMD ["npm", "run", "serve"]