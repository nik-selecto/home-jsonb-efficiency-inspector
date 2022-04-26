import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {LoggerModule} from "./logger.module";
import {OurLoggerGeneral} from "../../general/our-logger.general";

async function miniBootstrap() {
    const logger = await OurLoggerGeneral.init('LOGGER');
    const app = await NestFactory.create<NestFastifyApplication>(
        LoggerModule,
        new FastifyAdapter(),
        {
            logger,
        }
    );
    await app.listen(3001);
}

miniBootstrap().catch((error) => {
    console.error(error);
});
