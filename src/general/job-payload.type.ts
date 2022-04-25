import {QueueEnum} from "./queue.enum";
import {JOBS_MAPPER} from "./jobs-mapper.constant";

export type JobPayloadType<Q extends QueueEnum,
    J extends keyof typeof JOBS_MAPPER[Q],
    T extends Record<string, any> = Record<never, never>> = {
    queueName: Q,
    jobName: J,
    jobUuid: string,
} & T;
