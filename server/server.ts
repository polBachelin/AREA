import mongoose from 'mongoose';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createUser, updateUserPassword, updateUserEmail, updateUserUsername, deleteUser } from './src/models/User'
import { json } from 'express';

class Server {
    public app: express.Application;
    public db: mongoose.Mongoose;
    public dbHost: string;
    public port: string;
    public dbPort: string;
    public dbUri: string;

    constructor() {
        this.app = express();
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

    public listen() {
        this.app.listen(this.port, () => {
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

serv.listen();

serv.app.get('/', (req, res) => {
    res.send('hellow');
})

serv.app.post('/user', (req, res) => {
    createUser(req.body.username, req.body.email, req.body.password)
        .then(data => {
            res.send('User created');
        },
        error => {
            res.send('Error in user creation');
        });
})

serv.app.put('/user', (req, res) => {
    res.send('Updated user');
})

serv.app.delete('/user', (req, res) => {
    deleteUser(req.body.email);
    res.send('Deleted user');
})