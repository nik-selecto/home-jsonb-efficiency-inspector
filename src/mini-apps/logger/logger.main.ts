import {NestFactory} from '@nestjs/core';
import {LoggerModule} from "./logger.module";
import {OurLoggerGeneral} from "../../general/our-logger.general";
import {OurAppEnum} from "../../general/our-app.enum";

async function miniBootstrap() {
    await NestFactory.createApplicationContext(
        LoggerModule,
        {
            logger: await OurLoggerGeneral.init(OurAppEnum.OUR_LOGGER),
        }
    );
}

miniBootstrap().catch((error) => {
    console.error(error);
});
