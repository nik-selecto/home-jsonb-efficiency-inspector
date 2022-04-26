import {Process, Processor} from "@nestjs/bull";
import {QueueEnum} from "../../general/queue.enum";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {LogPayloadType} from "./log-payload-type";
import {Job} from "bull";

// TODO provide colors etc.
// TODO provide dynamic configuration through redis(bull)
// TODO provide generic IO targets (email, telegram, etc.)

@Processor(QueueEnum.LOG)
export class LoggerProcessor {
    @Process(JOBS_MAPPER[QueueEnum.LOG].error)
    error(job: Job<LogPayloadType>) {
        const [message, optionalParams] = this.messageBuilder(job.data);
        console.log(message, optionalParams);
    }

    @Process(JOBS_MAPPER[QueueEnum.LOG].log)
    log(job: Job<LogPayloadType>) {
        const [message, optionalParams] = this.messageBuilder(job.data);
        console.log(message);

        if (optionalParams.length) console.log(...optionalParams);
    }
    
    @Process(JOBS_MAPPER[QueueEnum.LOG].warn)
    warn(job: Job<LogPayloadType>) {
        const [message, optionalParams] = this.messageBuilder(job.data);
        console.log(message, optionalParams);
    }
    
    private messageBuilder(data: LogPayloadType) {
        const { fromApp, optionalParams, message } = data;
        
        return [`from ${fromApp}: ${message}`, optionalParams] as [string, any[]];
    }
}
