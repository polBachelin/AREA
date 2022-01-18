import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createUser, updateUserPassword, updateUserEmail, updateUserUsername, deleteUser } from './models/User'
import { json } from 'express';
import { INestApplication } from '@nestjs/common';
declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}

class Server {
    public app: INestApplication;
    public db: mongoose.Mongoose;
    public dbHost: string;
    public port: string;
    public dbPort: string;
    public dbUri: string;

    constructor() {
        this.app.use(json());
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

    public async createApp() {
      this.app = await NestFactory.create(AppModule)
    }

    public async listen() {
        await this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`);
        })
    }

    private initDoc() {
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
        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    private connectDb() {
        console.log("CONNECTION URI: ", this.dbUri);
        mongoose.connect(this.dbUri)
            .then(data => {
                this.db = data;
                console.log("connected to DB");
            },
            error => {
                console.log("error in connection to DB");
                console.log(error);
            });
    }
}

const serv = new Server();

serv.createApp();
serv.listen();

// serv.app.post('/user', (req, res) => {
//     createUser(req.body.username, req.body.email, req.body.password)
//         .then(data => {
//             res.send('User created');
//         },
//         error => {
//             res.send('Error in user creation');
//         });
// })

// serv.app.put('/user', (req, res) => {
//     res.send('Updated user');
// })

// serv.app.delete('/user', (req, res) => {
//     deleteUser(req.body.email);
//     res.send('Deleted user');
// })