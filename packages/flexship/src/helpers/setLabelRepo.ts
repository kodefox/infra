import fetch from 'node-fetch';

import { Fetch } from '../type';

export const addedLabels = [
  {
    name: 'approved with minor suggestions',
    color: '006b75',
  },
  {
    name: 'approved',
    color: '0e8a16',
  },
  {
    name: 'hotfix',
    color: '5319e7',
  },
  {
    name: 'reviewed with comments',
    color: 'fbc3dc',
  },
  {
    name: 'suggestions',
    color: 'd4c5f9',
  },
  {
    name: 'wip',
    color: '1d76db',
  },
  {
    name: 'ready for review',
    color: 'fbca04',
  },
];

export const deletedLabels = [
  'duplicate',
  'good first issue',
  'help wanted',
  'invalid',
];

export default async function setLabelRepo(
  repoName: string,
  githubToken: string,
  mockFetch?: Fetch,
) {
  let fetchFn = mockFetch || fetch;

  let addNewLabel = async () => {
    addedLabels.forEach((label) => {
      fetchFn(`https://api.github.com/repos/KodeFox/${repoName}/labels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.symmetra-preview+json',
          Authorization: `token ${githubToken}`,
        },
        body: JSON.stringify(label),
      }).catch((err) => console.error(err));
    });
  };

  let deleteLabels = async () => {
    deletedLabels.forEach((label) => {
      fetchFn(
        `https://api.github.com/repos/KodeFox/${repoName}/labels/${label}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `token ${githubToken}`,
          },
        },
      ).catch((err) => console.error(err));
    });
  };

  try {
    await addNewLabel();
    await deleteLabels();
    console.log('Finished setting labels 👌');
  } catch (error) {
    console.error('Something went wrong when setting the label ', error);
  }
}
