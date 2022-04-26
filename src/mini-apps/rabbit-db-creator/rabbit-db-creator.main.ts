import {NestFactory} from '@nestjs/core';
import {RabbitDbCreatorModule} from './rabbit-db-creator.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {OurLoggerGeneral} from "../../general/our-logger.general";
import {OurAppEnum} from "../../general/our-app.enum";

async function miniBootstrap() {
    const logger = await OurLoggerGeneral.init(OurAppEnum.RABBIT_DB_CREATOR);
    const app = await NestFactory.create<NestFastifyApplication>(
        RabbitDbCreatorModule,
        new FastifyAdapter(),
        {logger},
    );
    await app.listen(3002);
}

miniBootstrap().catch((error) => {
    console.error(error);
});
