import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({origin: "http://localhost:5173", credentials: true})
    app.use(cookieParser())

    await setupSwagger(app);
    await app.listen(3000);
    console.log(`Application is running on : ${ await app.getUrl()}`)
    console.log(`Swagger is running on: ${(await app.getUrl()).concat('/api')}`)
}

async function setupSwagger(app: INestApplication){
    const config = new DocumentBuilder()

    .setTitle('Dmitrieeva - Сайт фотографа')
    .setDescription('Описание api сайта фотографа')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

bootstrap();
