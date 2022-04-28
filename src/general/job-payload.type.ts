import {QueueEnum} from "./queue.enum";

export type JobPayloadType<Q extends QueueEnum,
    T extends Record<string, any> = Record<never, never>> = {
    queueName: Q,
    jobId: string,
} & T;
