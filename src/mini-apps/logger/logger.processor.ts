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
        this.print(job.data, 'error');
    }

    @Process(JOBS_MAPPER[QueueEnum.LOG].log)
    log(job: Job<LogPayloadType>) {
        this.print(job.data, 'log');
    }
    
    @Process(JOBS_MAPPER[QueueEnum.LOG].warn)
    warn(job: Job<LogPayloadType>) {
        this.print(job.data, 'warn');
    }
    
    private print(data: LogPayloadType, type: 'log' | 'warn' | 'error') {
        const { fromApp, jobUuid, jobName, queueName, message } = data;
        const _fromApp = ` ${fromApp} `;
        const _jobName = jobName ? `/${jobName}` : '';
        const _queueName = queueName ? `/${queueName}` : '';
        const _jobUuid = jobUuid ? `/${jobUuid}` : '';
        const _message = message;
        
        console[type](`${_fromApp}${_queueName}${_jobName}${_jobUuid}: ${_message}`);
    }
}
