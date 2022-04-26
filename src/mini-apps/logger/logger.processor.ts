import {Process, Processor} from "@nestjs/bull";
import {QueueEnum} from "../../general/queue.enum";
import {ConsoleLogger} from "@nestjs/common";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {LogPayloadType} from "./log-payload-type";
import {Job} from "bull";
import {LogLevelType} from "./log-level.type";

@Processor(QueueEnum.LOG)
export class LoggerProcessor extends ConsoleLogger {
    @Process(JOBS_MAPPER[QueueEnum.LOG].error)
    error(job: Job<LogPayloadType<'error'>>) {
        super.error(...this.messageBuilder(job.data));
    }
    
    @Process(JOBS_MAPPER[QueueEnum.LOG].log)
    log(job: Job<LogPayloadType<'log'>>) {
        super.log(...this.messageBuilder(job.data));
    }
    
    @Process(JOBS_MAPPER[QueueEnum.LOG].warn)
    warn(job: Job<LogPayloadType<'warn'>>) {
        super.warn(...this.messageBuilder(job.data));
    }
    
    private messageBuilder(data: LogPayloadType<LogLevelType>) {
        const { fromApp, jobName, jobUuid, message, queueName, stack, context } = data;
        
        return [
            `=>>> ${fromApp} | ${queueName} | ${jobName} | ${jobUuid} : ${message}`,
            stack,
            context,
        ] as [any, string | undefined, string | undefined];
    }
}
