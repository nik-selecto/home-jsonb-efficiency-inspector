import {JobPayloadType} from "../../../general/job-payload.type";
import {QueueEnum} from "../../../general/queue.enum";
import {JsonType} from "../../../general/json.type";

export type CreateTableProcessType = JobPayloadType<QueueEnum.RABBIT_DB, {
    userId: string,
    tableName: string,
    jColumnExamples: JsonType[],
}>;
