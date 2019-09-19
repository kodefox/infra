import { spawn } from 'child_process';
import { platform } from 'os';

let isWindows = platform() === 'win32';

export default (command: string, args: Array<string>, message: string) => {
  return new Promise((resolve, reject) => {
    let commandProcess = spawn(command, args, {
      shell: isWindows,
    });

    commandProcess.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    commandProcess.on('close', (code) => {
      if (code !== 0) {
        console.log(
          `Something went wrong, ${command} exited with code ${code}`,
        );
        reject();
        return;
      }
      console.log(message);
      resolve();
    });
  });
};
