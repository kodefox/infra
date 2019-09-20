import spawn from './spawn';
import { Answers } from '../type';
import { REPOS } from '../constants/repo';

export default async ({ projectType, projectName }: Answers) => {
  let command = 'git';
  let args = ['clone', REPOS[projectType], projectName];
  let startMessage = 'Cloning the repo...';
  return spawn(command, args, { startMessage });
};
