import {Process, Processor} from "@nestjs/bull";
import {QueueEnum} from "../../general/queue.enum";
import {JOBS_MAPPER} from "../../general/jobs-mapper.constant";
import {LogPayloadType} from "./log-payload-type";
import {Job} from "bull";
import {OurAppEnum} from "../../general/our-app.enum";
import * as chalk from 'chalk';

// TODO provide colors etc.
// TODO provide dynamic configuration through redis(bull)
// TODO provide generic IO targets (email, telegram, etc.)

const appBgColors: Record<OurAppEnum, string> = {
    [OurAppEnum.OUR_LOGGER]: '#1e72b0',
    [OurAppEnum.RABBIT_DB_CREATOR]: '#6a1eb0',
    [OurAppEnum.MAIN_APPLICATION]: '#b04d1e',
};
const lineColors = {
    log: '#77c862',
    warn: '#fdeb1b',
    error: '#e41818',
};

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
        const _fromApp = chalk.bold.italic.bgHex(appBgColors[fromApp])(` ${chalk.whiteBright(fromApp)} `);
        const _jobName = jobName ? `/${jobName}` : '';
        const _queueName = queueName ? `/${queueName}` : '';
        const _jobUuid = jobUuid ? `/${jobUuid}` : '';
        const _message = chalk.hex(lineColors[type])(message);
        
        console[type](`${_fromApp}${_queueName}${_jobName}${_jobUuid}: ${_message}`);
    }
}
