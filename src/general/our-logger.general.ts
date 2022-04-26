import {LoggerService} from "@nestjs/common";
import * as Bull from 'bull';
import {Queue} from 'bull';
import {QueueEnum} from "./queue.enum";
import {LogPayloadType} from "../mini-apps/logger/log-payload-type";


export class OurLoggerGeneral implements LoggerService {
    private constructor(private appName: string, private logQueue: Queue) {
    }

    public static async init(appName: string) {
        const logProduccerQueue = new Bull(QueueEnum.LOG);

        return new OurLoggerGeneral(appName, logProduccerQueue);
    }

    error(message: any, ...optionalParams: any[]): any {
        this.logQueue.add('error', this.generatePayload(message, ...optionalParams));
    }

    log(message: any, ...optionalParams: any[]): any {
        this.logQueue.add('log', this.generatePayload(message, ...optionalParams));
    }

    warn(message: any, queueName?: QueueEnum, ...optionalParams: any[]): any {
        this.logQueue.add('warn', this.generatePayload(message, ...optionalParams));
    }

    private generatePayload(message: string, options: {
        queueName?: QueueEnum,
        jobName?: string,
        jobUuid?: string,
    } = {}, ...optionalParams: any[]): LogPayloadType {
        const { queueName, jobName, jobUuid } = options;

        return {
            message,
            optionalParams: [...[queueName, jobName,  jobUuid].filter((i) => i), ...optionalParams],
            fromApp: this.appName,
        };
    }

}