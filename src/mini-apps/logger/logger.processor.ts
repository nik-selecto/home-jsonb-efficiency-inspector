import {Process, Processor} from "@nestjs/bull";
import {QueueEnum} from "../../general/queue.enum";
import {ConsoleLogger} from "@nestjs/common";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {LogPayloadType} from "./log-payload-type";
import {Job} from "bull";

@Processor(QueueEnum.LOG)
export class LoggerProcessor extends ConsoleLogger {
    @Process(JOBS_MAPPER[QueueEnum.LOG].error)
    error(job: Job<LogPayloadType>) {
        const [message, optionalParams] = this.messageBuilder(job.data);
        super.error(message, ...optionalParams);
    }
    
    @Process(JOBS_MAPPER[QueueEnum.LOG].log)
    log(job: Job<LogPayloadType>) {
        const [message, optionalParams] = this.messageBuilder(job.data);
        super.log(message, ...optionalParams);
    }
    
    @Process(JOBS_MAPPER[QueueEnum.LOG].warn)
    warn(job: Job<LogPayloadType>) {
        const [message, optionalParams] = this.messageBuilder(job.data);
        super.warn(message, ...optionalParams);
    }
    
    private messageBuilder(data: LogPayloadType) {
        const { fromApp, optionalParams, message } = data;
        
        return [`from ${fromApp}: ${message}`, optionalParams];
    }
}
