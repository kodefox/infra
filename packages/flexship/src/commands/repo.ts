import { Fetch } from '../type';
import { createRepoGithub, promptCLI, getRootToken } from '../helpers';

export let command = 'create-repo';
export let desc = 'Create a new repo in github';

export let handlerCreateRepo = async (token: string, mockFetch?: Fetch) => {
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
    await createRepoGithub(parsedRepoName, parsedGithubToken, mockFetch);
    console.log('Finished creating a new repo 👌');
  } catch (error) {
    if (error.message === 'Bad credentials') {
      throw new Error(error.message);
    }
    throw new Error(error.message);
  }
};

export let handler = async (mockFetch?: Fetch) => {
  let token: string = await getRootToken();
  try {
    await handlerCreateRepo(token, mockFetch);
  } catch (error) {
    throw new Error(error);
  }
};

export default { handler, handlerCreateRepo };
