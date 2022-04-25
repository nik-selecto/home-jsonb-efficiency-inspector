import {CreateDbReqDto} from "../dto/req/create-db.req.dto";

export type CreateDbType = CreateDbReqDto & {
    userEmail: string;
    userId: string;
}
