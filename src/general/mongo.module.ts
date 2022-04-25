import {ConfigModule, ConfigService} from "@nestjs/config";
import {ProjectConfigType} from "./config.type";
import {MongooseModule} from "@nestjs/mongoose";

const mongoOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService<ProjectConfigType>) => ({
        uri: `mongodb://${config.get('MONGO_HOST')}:${config.get(
            'MONGO_PORT',
        )}/${config.get('MONGO_DB')}`,
    }),
};

export const Mongo = MongooseModule.forRootAsync(mongoOptions);
