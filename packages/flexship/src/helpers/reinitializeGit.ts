import path from 'path';
import spawn from './spawn';

function removeGit(projectName: string) {
  let command = 'rm';
  let args = ['-rf', `${projectName}/.git`];
  return spawn(command, args);
}

function initGit(projectName: string) {
  let command = 'git';
  let args = ['init', `./${projectName}`];
  return spawn(command, args);
}

function stageFiles(projectName: string) {
  let command = 'git';
  let args = ['add', '.'];
  let cwd = path.resolve(process.cwd(), projectName);
  return spawn(command, args, { cwd });
}

function commit(projectName: string) {
  let command = 'git';
  let args = ['commit', '-m', 'add initial files'];
  let startMessage = 'Creating initial commit...';
  let cwd = path.resolve(process.cwd(), projectName);
  return spawn(command, args, { cwd, startMessage });
}
export default async (projectName: string) => {
  await removeGit(projectName);
  await initGit(projectName);
  await stageFiles(projectName);
  await commit(projectName);
};
