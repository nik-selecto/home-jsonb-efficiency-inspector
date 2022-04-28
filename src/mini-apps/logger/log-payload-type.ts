import {OurAppEnum} from "../../general/our-app.enum";
import {JobPayloadType} from "../../general/job-payload.type";
import {QueueEnum} from "../../general/queue.enum";

export type LogPayloadType = {
    message: string,
    fromApp: OurAppEnum,
    jobName: string,
    } & Partial<JobPayloadType<QueueEnum>>;
