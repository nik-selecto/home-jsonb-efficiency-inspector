import {LoggerService} from "@nestjs/common";
import * as Bull from 'bull';
import {Queue} from 'bull';
import {QueueEnum} from "./queue.enum";
import {LogPayloadType} from "../mini-apps/logger/log-payload-type";
import {OurAppEnum} from "./our-app.enum";

type ParamsType = Partial<Omit<LogPayloadType, 'message'>>;

export class OurLoggerGeneral implements LoggerService {
    private constructor(private appName: OurAppEnum, private logQueue: Queue) {
    }

    public static async init(appName: OurAppEnum) {
        const logProduccerQueue = new Bull(QueueEnum.LOG);

        await Promise.all((['completed', 'wait', 'active', 'delayed', 'failed', 'paused'] as const).map((status) => {
            logProduccerQueue.clean(0, status);
        }));

        return new OurLoggerGeneral(appName, logProduccerQueue);
    }

    error(message: any, params: ParamsType = {}): any {
        this.send(message, {fromApp: this.appName, ...params}, 'error');
    }

    log(message: any, params: ParamsType = {}): any {
        this.send(message, {fromApp: this.appName, ...params}, 'log');
    }

    warn(message: any, params: ParamsType = {}): any {
        this.send(message, {fromApp: this.appName, ...params}, 'warn');
    }

    private send(message: string, params: ParamsType, type: 'error' | 'warn' | 'log') {
        this.logQueue.add(type, {message, ...params});
    }
}