import {Module} from '@nestjs/common';
import {BullModule} from '@nestjs/bull';
import {PgModule} from '../../general/pg.module';
import {QueueEnum} from '../../general/queue.enum';
import {Config} from '../../general/config.module';
import {LoggerProcessor} from "./logger.processor";

@Module({
    imports: [
        Config,
        BullModule.forRoot({}),
        BullModule.registerQueue({name: QueueEnum.LOG}),
        PgModule,
    ],
    providers: [LoggerProcessor],
})
export class LoggerModule {
}
