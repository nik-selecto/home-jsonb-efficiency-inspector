import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../users/user';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {JwtPayloadType} from "./jwt-payload.type";
import {ProjectConfigType} from "../../general/config.type";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {LoginResDto} from "./dto/login.res.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private config: ConfigService<ProjectConfigType>
    ) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userModel.findOne({email}).lean();

        if (!(user && bcrypt.compareSync(password, user.password))) return null;

        const {password: pass, ..._user} = user;

        return _user;
    }

    login(user: Omit<User, 'password'>): LoginResDto {
        const payload: Omit<JwtPayloadType, '_id' | 'id'> & { id: string } = {
            email: user.email,
            id: String(user._id),
        };

        return {
            email: payload.email,
            _id: payload.id,
            ...this.generateJwtTokens(payload),
        };
    }

    async refresh(token: string) {
        const payload: Omit<JwtPayloadType, '_id'> = this.jwtService.verify(token, {secret: this.config.get('JWT_REFRESH_SECRET')});

        if (!payload.email) throw new UnauthorizedException();

        return {
            ...payload,
            ...this.generateJwtTokens(payload),
        };
    }

    private generateJwtTokens(payload: Omit<JwtPayloadType, '_id'>): { access: string, refresh: string } {
        return {
            access: this.jwtService.sign(payload, {secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: '40s'}),
            refresh: this.jwtService.sign(payload, {secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: '3d'}),
        };
    }

}