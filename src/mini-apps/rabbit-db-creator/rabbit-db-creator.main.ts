import {NestFactory} from '@nestjs/core';
import {RabbitDbCreatorModule} from './rabbit-db-creator.module';
import {OurLoggerGeneral} from "../../general/our-logger.general";
import {OurAppEnum} from "../../general/our-app.enum";

async function miniBootstrap() {
    await NestFactory.createApplicationContext(
        RabbitDbCreatorModule,
        {logger: await OurLoggerGeneral.init(OurAppEnum.RABBIT_DB_CREATOR)},
    );
}

miniBootstrap().catch((error) => {
    console.error(error);
});
