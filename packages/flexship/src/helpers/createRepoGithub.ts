import fetch from 'node-fetch';

import writeRootToken from './writeRootToken';
import setLabelRepo from './setLabelRepo';

export default async function createRepoGithub(
  repoName: string,
  githubToken: string,
) {
  let repo = {
    name: repoName,
    description: 'This is your new repository from flexship',
    homepage: 'https://github.com',
    private: true,
    allow_merge_commit: false,
    allow_rebase_merge: false,
  };

  let response = await fetch(`https://api.github.com/orgs/KodeFox/repos`, {
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
    console.log('Bad credentials, please Input the right token');
    throw new Error(result.message);
  } else {
    await writeRootToken(githubToken);
    await setLabelRepo(repoName, githubToken);
  }
}
