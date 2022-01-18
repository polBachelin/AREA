"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("mongoose");
const swagger_jsdoc_1 = require("swagger-jsdoc");
const swagger_ui_express_1 = require("swagger-ui-express");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
}
class Server {
    constructor() {
        this.app.use((0, express_1.json)());
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
    async createApp() {
        this.app = await core_1.NestFactory.create(app_module_1.AppModule);
    }
    async listen() {
        await this.app.listen(this.port, () => {
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
serv.createApp();
serv.listen();
//# sourceMappingURL=main.js.map