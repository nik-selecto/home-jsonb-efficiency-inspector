import {spawn} from 'child_process';

async function startDev() {
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
