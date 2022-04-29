import {QueueEnum} from "./queue.enum";

export const JOBS_MAPPER = {
    [QueueEnum.RABBIT_DB]: {
        createDb: 'create_db' as const,
        createTable: 'create_table' as const,
    },
    [QueueEnum.LOG]: {
        error: 'error' as const,
        warn: 'warn' as const,
        log: 'log' as const,
    },
};
