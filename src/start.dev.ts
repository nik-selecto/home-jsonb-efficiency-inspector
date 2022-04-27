import { spawn } from 'child_process';

const logger = spawn('npm', ['run', 'mini:logger']);



logger.stdout.on('data', (data) => console.log(String(data)));

console.log('finish');

process.on('exit', () => {
    logger.emit('exit');
});
