import {OurAppEnum} from "../../general/our-app.enum";
import {JobPayloadType} from "../../general/job-payload.type";
import {QueueEnum} from "../../general/queue.enum";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";

export type LogPayloadType = {
    message: string,
    fromApp: OurAppEnum,
    } & Partial<JobPayloadType<QueueEnum, keyof typeof JOBS_MAPPER[QueueEnum]>>;
