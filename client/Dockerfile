FROM node:16

WORKDIR /app/

COPY . /app/

RUN npm install
#RUN mv /build/android/build/app/outputs/apk/release/app-release.apk ./public
ENV HOST 0.0.0.0

CMD ["npm", "run", "serve", "--", "--port", "8081"]