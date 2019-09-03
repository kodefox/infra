import { spawn } from 'child_process';

import { Answers } from '../type';
import { REPOS } from '../constants/repo';

export default ({ projectType, projectName }: Answers) => {
  return new Promise((resolve, reject) => {
    let git = spawn('git', ['clone', REPOS[projectType], projectName.trim()]);

    git.stderr.on('data', (data) => {
      console.log(`${data}`);
    });

    git.on('close', (code) => {
      if (code !== 0) {
        console.log(`Something went wrong, git exited with code ${code}`);
        reject();
        return;
      }
      console.log('Finish cloning the repo');
      resolve();
    });
  });
};
