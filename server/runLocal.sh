sudo docker run -d -p 27017:27017 -e MONGO_INITDB_DATABASE=db mongo:latest
export DB_HOST=127.0.0.1
export DB_PORT=27017
# export DB_USERNAME=root
# export DB_PASSWORD=pass12345
export PORT=8080
export DB_DEBUG=mongodb://localhost:27017/db
npm run build
npm run start
