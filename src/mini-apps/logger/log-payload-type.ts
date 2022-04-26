import {LogLevelType} from "./log-level.type";
import {JobPayloadType} from "../../general/job-payload.type";
import {QueueEnum} from "../../general/queue.enum";

type _LogPayloadType<T extends LogLevelType> = {
    message: any,
    stack?: string,
    context?: string,
    fromApp: string,
    level: T,
}

export type LogPayloadType<T extends LogLevelType> = JobPayloadType<QueueEnum.LOG, T, _LogPayloadType<T>>;
