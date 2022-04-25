import {Module} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from './user';
import {Model} from 'mongoose';
import {CreateUserDto} from './dto/create-user.dto';
import {ConfigService} from "@nestjs/config";
import {ProjectConfigType} from "../../general/config.type";
import * as bcrypt from 'bcrypt';

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


}
