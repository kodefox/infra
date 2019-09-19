import spawn from './spawn';

function removeGit(projectName: string) {
  let command = 'rm';
  let args = ['-rf', `${projectName}/.git`];
  let finishMessage = 'Finish removing git folder';
  return spawn(command, args, finishMessage);
}

function initGit(projectName: string) {
  let command = 'git';
  let args = ['init', `./${projectName}`];
  let finishMessage = 'Finish reinitialize git';
  return spawn(command, args, finishMessage);
}
export default async (projectName: string) => {
  await removeGit(projectName);
  await initGit(projectName);
};
