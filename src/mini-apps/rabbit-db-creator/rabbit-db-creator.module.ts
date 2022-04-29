import {Module} from '@nestjs/common';
import {BullModule} from '@nestjs/bull';
import {RabbitDbCreatorProcessor} from './rabbit-db-creator.processor';
import {QueueEnum} from '../../general/queue.enum';
import {Config} from '../../general/config.module';
import {Mongo} from "../../general/mongo.module";
import {UsersModule} from "../../components/users/users.module";

@Module({
    imports: [
        Config,
        BullModule.forRoot({}),
        Mongo,
        UsersModule,
        BullModule.registerQueue({name: QueueEnum.RABBIT_DB}),
    ],
    providers: [RabbitDbCreatorProcessor],
})
export class RabbitDbCreatorModule {
}
