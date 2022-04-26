import {Module} from '@nestjs/common';
import {AppController} from './components/app/app.controller';
import {AppService} from './components/app/app.service';
import {BullModule} from '@nestjs/bull';
import {RabbitModule} from './components/rabbit/rabbit.module';
import {UsersModule} from './components/users/users.module';
import {AuthModule} from './components/auth/auth.module';
import {Config} from './general/config.module';
import {Mongo} from "./general/mongo.module";


@Module({
    imports: [
        Config,
        BullModule.forRoot({}),
        RabbitModule,
        Mongo,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
