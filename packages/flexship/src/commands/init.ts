import inquirer from 'inquirer';

import { REPO } from '../constants/repo';
import { Answers } from '../type';
import { cloneRepo } from '../helpers';

export let command = 'init';
export let desc = 'Create a new project';

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
  try {
    await cloneRepo({ projectName, projectType });
  } catch (error) {
    console.log('Something went wrong ', error);
  }
};
