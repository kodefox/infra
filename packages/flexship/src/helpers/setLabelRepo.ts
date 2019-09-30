import fetch from 'node-fetch';

const addedLabels = [
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

const deletedLabels = [
  'duplicate',
  'good first issue',
  'help wanted',
  'invalid',
];

export default async function setLabelRepo(
  repoName: string,
  githubToken: string,
) {
  let addNewLabel = async () => {
    addedLabels.forEach((label) => {
      fetch(`https://api.github.com/repos/KodeFox/${repoName}/labels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.symmetra-preview+json',
          Authorization: `token ${githubToken}`,
        },
        body: JSON.stringify(label),
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
    });
  };

  let deleteLabels = async () => {
    deletedLabels.forEach((label) => {
      fetch(
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

  await addNewLabel();
  await deleteLabels();
}
