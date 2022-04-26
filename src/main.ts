import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {OurLoggerGeneral} from "./general/our-logger.general";
import {OurAppEnum} from "./general/our-app.enum";

async function bootstrap() {
    const logger = await OurLoggerGeneral.init(OurAppEnum.MAIN_APPLICATION);
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            logger,
        }
    );

    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            skipMissingProperties: false,
            transform: true,
        }),
    );

    await app.listen(3000);
}

bootstrap();
