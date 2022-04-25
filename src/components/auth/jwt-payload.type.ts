import {Types} from "mongoose";

export type JwtPayloadType = {
    _id: Types.ObjectId,
    id: string,
    email: string,
}
