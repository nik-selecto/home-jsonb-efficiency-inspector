import {Module} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from './user';
import {Model, QueryOptions} from 'mongoose';
import {CreateUserDto} from './dto/create-user.dto';
import {ConfigService} from "@nestjs/config";
import {ProjectConfigType} from "../../general/config.type";
import * as bcrypt from 'bcrypt';
import { FilterQuery, UpdateQuery } from 'mongoose';

@Module({})
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private configService: ConfigService<ProjectConfigType>,
    ) {
    }

    async createUser(data: CreateUserDto) {
        const { password, ...dto } = data;
        const salt = this.configService.get('SALT_USER_PASS');
        const hash = bcrypt.hashSync(password, salt);

        const user = await this.userModel.create({ ...dto, password: hash });

        return { email: user.email, _id: user._id };
    }

    async findOne(query: FilterQuery<User>, projection: Partial<(Record<keyof User, 1>) | (Record<keyof User, 0>)> = { password: 0 }, options: QueryOptions<User> = {}) {
        return this.userModel.findOne(query, projection, options).lean();
    }

    async updateOne(query: FilterQuery<User>, updates: UpdateQuery<User>) {
        return this.userModel.updateOne(query, updates).lean();
    }
}
