import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';
import { Types } from 'mongoose';
import {ProjectConfigType} from "../../../general/config.type";
import {JwtPayloadType} from "../jwt-payload.type";
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(PassportJwtStrategy) {
    constructor(private config: ConfigService<ProjectConfigType>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: Omit<JwtPayloadType, '_id'>): Promise<JwtPayloadType> {
        return { _id: new Types.ObjectId(payload.id), id: payload.id, email: payload.email };
    }
}