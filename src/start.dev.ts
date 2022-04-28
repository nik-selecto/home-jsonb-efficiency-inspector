import {spawn} from 'child_process';
import * as Bull from "bull";
import {QueueEnum} from "./general/queue.enum";

async function startDev() {
    const logProduccerQueue = new Bull(QueueEnum.LOG);

    await Promise.all((['completed', 'wait', 'active', 'delayed', 'failed', 'paused'] as const)
        .map((status) => {
            return logProduccerQueue.clean(0, status);
        }));

    const logger = spawn('npm', ['run', 'mini:logger'], {
        stdio: 'inherit',
    });
    const rabbit = spawn('npm', ['run', 'mini:rabbit']);
    const app = spawn('npm', ['run', 'mini:app']);


    process.on('SIGTERM', () => {
        [app, rabbit, logger].forEach((mini) => {
            mini.kill('SIGKILL');
        });
    });
}

startDev().catch((error) => {
    console.error(error);
});
