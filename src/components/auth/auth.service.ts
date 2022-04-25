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
import {RefreshResDto} from "./dto/refresh.res.dto";

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

    refresh(token: string): RefreshResDto {
        const payload: Omit<JwtPayloadType, '_id'> = this.jwtService.verify(token, {secret: this.config.get('JWT_REFRESH_SECRET')});

        if (!payload.email) throw new UnauthorizedException();

        return this.generateJwtTokens(payload);
    }

    // TODO more clearly dto for payloads etc.
    private generateJwtTokens(payload: Omit<JwtPayloadType, '_id'>) {
        const _payload = {
            id: payload.id,
            email: payload.email,
        };

        return {
            _id: payload.id,
            email: payload.email,
            access: this.jwtService.sign(_payload, {secret: this.config.get('JWT_ACCESS_SECRET'), expiresIn: '3m'}),
            refresh: this.jwtService.sign(_payload, {secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: '3d'}),
        };
    }

}
