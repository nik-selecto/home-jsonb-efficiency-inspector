import {QueueEnum} from "./queue.enum";

export const JOBS_MAPPER = {
    [QueueEnum.RABBIT_DB]: {
        create: 'create' as const,
    },
};
