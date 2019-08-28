import inquirer from 'inquirer';
import { spawn } from 'child_process';
export let command = 'init';
export let desc = 'Create a new project';

type ProjectType = 'Expo (Frontend)' | 'Express (Backend)';
type Answers = {
  projectType: ProjectType;
  projectName: string;
};
let REPO: { [id in ProjectType]: string } = {
  'Expo (Frontend)': 'https://github.com/kodefox/example-expo-ts.git',
  'Express (Backend)': 'https://github.com/kodefox/example-express-ts.git',
};

export let handler = async () => {
  let { projectType, projectName }: Answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'What project you want to create?',
      choices: Object.keys(REPO),
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the project name? ex:my-cool-project',
      validate: (answer: string) => {
        if (answer.trim() === '') {
          return `project name can't be empty`;
        }
        return true;
      },
    },
  ]);

  let echo = spawn('git', ['clone', REPO[projectType], projectName.trim()]);

  echo.stderr.on('data', (data) => {
    console.log(`${data}`);
  });

  echo.on('close', (code) => {
    if (code !== 0) {
      console.log(`Something went wrong, process exited with code ${code}`);
      return;
    }
    console.log('Finish cloning the repo');
  });
};
