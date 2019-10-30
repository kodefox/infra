import fetch from 'node-fetch';

import { Fetch } from '../type';
import writeRootToken from './writeRootToken';
import setLabelRepo from './setLabelRepo';

export default async function createRepoGithub(
  repoName: string,
  githubToken: string,
  mockFetch?: Fetch,
) {
  let repo = {
    name: repoName,
    description: '',
    homepage: 'https://github.com',
    private: true,
    allow_merge_commit: false,
    allow_rebase_merge: false,
  };

  let fetchFn = mockFetch || fetch;

  try {
    let response = await fetchFn('https://api.github.com/orgs/KodeFox/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.baptiste-preview+json',
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify(repo),
    });

    let result = await response.json();

    if (result.message === 'Bad credentials') {
      throw new Error(result.message);
    } else {
      await writeRootToken(githubToken);
      await setLabelRepo(repoName, githubToken);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
