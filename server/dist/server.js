"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const User_1 = __importDefault(require("./src/models/User"));
const express_2 = require("express");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, express_2.json)());
        this.dbHost = process.env.DB_HOST;
        this.port = process.env.PORT;
        this.dbPort = process.env.DB_PORT;
        if (process.env.DB_DEBUG == undefined)
            this.dbUri = "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + this.dbHost + ":" + this.dbPort;
        else
            this.dbUri = process.env.DB_DEBUG;
        this.initDoc();
        this.connectDb();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`);
        });
    }
    initDoc() {
        const options = {
            definition: {
                openapi: "3.0.3",
                info: {
                    title: "AREA",
                    description: "Area for epitech",
                    version: "1.0.0",
                },
            },
            apis: ["./api/openapi.yaml"],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    connectDb() {
        console.log("CONNECTION URI: ", this.dbUri);
        mongoose_1.default.connect(this.dbUri)
            .then(data => {
            this.db = data;
            console.log("connected to DB");
        }, error => {
            console.log("error in connection to DB");
            console.log(error);
        });
    }
}
const serv = new Server();
serv.listen();
serv.app.get('/', (req, res) => {
    res.send('hellow');
});
serv.app.post('/user', (req, res) => {
    // const doc = new UserModel({
    //     username: req.body
    // })
    console.log("body: ", req.body.username);
    // doc.save();
    res.send('ok');
});
serv.app.get('/user', (req, res) => {
    User_1.default.find({}, function (err, users) {
        users.forEach(function (user) {
            console.log(user.id);
            res.send(user.id);
        });
    });
});
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
// app.post('/user', (req, res) => {
//     console.log(req)
//     res.send('Recieved something')
// })
// app.listen(port, () => {
//     console.log('example app listening')
// })
// 'use strict';
// var path = require('path');
// var http = require('http');
// var oas3Tools = require('oas3-tools');
// var serverPort = 8080;
// // swaggerRouter configuration
// var options = {
//     routing: {
//         controllers: path.join(__dirname, './controllers')
//     },
// };
// var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
// var app = expressAppConfig.getApp();
// // Initialize the Swagger middleware
// http.createServer(app).listen(serverPort, function () {
//     console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
//     console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
// });
