import {JwtPayloadType} from "../jwt-payload.type";

export class LoginResDto implements Omit<JwtPayloadType, '_id' | 'id'> {
    _id: string;
    email: string;
    access: string;
    refresh: string;
}