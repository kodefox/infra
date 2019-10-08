import { Fetch } from '../type';
import { createRepoGithub, promptCLI, getRootToken } from '../helpers';

export let command = 'create-repo';
export let desc = 'Create a new repo in github';

export let handlerCreateRepo = async (token: string) => {
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
      'What is your Github TOKEN?',
    );
    parsedGithubToken = inputGithubToken.trim();
  } else {
    parsedGithubToken = token.trim();
  }

  parsedRepoName = repoName.trim();

  try {
    await createRepoGithub(parsedRepoName, parsedGithubToken);
    console.log('Finished creating a new repo 👌');
  } catch (error) {
    if (error.message === 'Bad credentials') {
      console.error('Bad credentials, please input the right token');
      throw new Error(error.message);
    }
    throw new Error(error.message);
  }
};

export let handler = async () => {
  let token: string = await getRootToken();
  try {
    await handlerCreateRepo(token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { handler, handlerCreateRepo };
