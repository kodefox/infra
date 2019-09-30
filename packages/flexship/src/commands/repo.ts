import { createRepoGithub, promptCLI } from '../helpers';
import getRootToken from '../helpers/getRootToken';

export let command = 'create-repo';
export let desc = 'Create a new repo in github';

let handlerCreateRepo = async (token: string) => {
  let parsedRepoName: string = '';
  let parsedGithubToken: string = '';

  let { repoName } = await promptCLI<'repoName'>(
    'repoName',
    'input',
    'What is the repo name? ex:my-awesome-app',
  );

  if (token === '') {
    let { inputGithubToken } = await promptCLI<'inputGithubToken'>(
      'inputGithubToken',
      'input',
      'What is the github token?',
    );
    parsedGithubToken = inputGithubToken.trim();
  } else {
    parsedGithubToken = token.trim();
  }

  parsedRepoName = repoName.trim();

  try {
    await createRepoGithub(parsedRepoName, parsedGithubToken);
    console.log('Finished creating new repo 👌');
  } catch (error) {
    if (error.message === 'Bad credentials') {
      return handler();
    }
    console.log('Something went wrong ', error);
  }
};

export let handler = async () => {
  let token: string = await getRootToken();
  await handlerCreateRepo(token);
};
