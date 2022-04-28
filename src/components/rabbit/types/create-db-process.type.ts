import {JobPayloadType} from "../../../general/job-payload.type";
import {QueueEnum} from "../../../general/queue.enum";

export type CreateDbProcessType = JobPayloadType<QueueEnum.RABBIT_DB> & {
    userId: string,
};
