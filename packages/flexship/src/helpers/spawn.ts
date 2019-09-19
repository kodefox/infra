import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { platform } from 'os';

let isWindows = platform() === 'win32';

type Option = { startMessage?: string } & SpawnOptionsWithoutStdio;

export default (
  command: string,
  args: Array<string>,
  { cwd, startMessage }: Option = {},
) => {
  return new Promise((resolve, reject) => {
    startMessage && console.log(startMessage);
    let commandProcess = spawn(command, args, {
      shell: isWindows,
      cwd,
    });

    commandProcess.on('close', (code) => {
      if (code !== 0) {
        console.log(
          `Something went wrong, ${command} exited with code ${code}`,
        );
        reject();
        return;
      }
      resolve();
    });
  });
};
