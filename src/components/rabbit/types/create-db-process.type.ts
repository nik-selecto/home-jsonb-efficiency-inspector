import {JobPayloadType} from "../../../general/job-payload.type";
import {QueueEnum} from "../../../general/queue.enum";
import {CreateDbType} from "./create-db.type";

export type CreateDbProcessType = JobPayloadType<QueueEnum.RABBIT_DB, 'create', CreateDbType>;
