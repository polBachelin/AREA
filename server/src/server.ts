import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
declare const module: any;

export class Server {
    public app: INestApplication;
    public port: string;

    constructor() {
        this.port = process.env.PORT;
        this.createApp();
    }

    public async createApp() {
    	this.app = await NestFactory.create(AppModule);
		this.initDoc();
		this.listen();
    }

    public async listen() {
        this.app.enableCors()
        await this.app.listen(this.port, () => {
            console.log(`listening on port ${this.port}`);
        })
    }

    private initDoc() {
        const config = new DocumentBuilder()
        .setTitle('AREA')
        .setDescription('The area API description')
        .setVersion('1.0')
        .addTag('area')
        .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup('api', this.app, document);
    }
}