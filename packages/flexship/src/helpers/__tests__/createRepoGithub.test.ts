import createRepoGithub from '../createRepoGithub';

const MOCK_REPO_NAME = 'repoName';
const MOCK_GITHUB_TOKEN = 'githubToken';

const CONSOLE_SPY = jest.spyOn(console, 'log').mockImplementation(() => '');
const CONSOLE_ERROR_SPY = jest
  .spyOn(console, 'error')
  .mockImplementation(() => '');

const RESULT = {
  json: jest.fn(() => ({ message: 'success' })),
};

jest.mock('node-fetch', () => () => Promise.resolve(RESULT));

describe('createRepoGithub', () => {
  afterAll(() => {
    CONSOLE_ERROR_SPY.mockRestore();
    CONSOLE_SPY.mockRestore();
  });

  it('should called createRepoGithub with resolved promise', async () => {
    const RESULT = {
      json: jest.fn(() => ({ message: 'success' })),
    };
    const MOCKED_FETCH = jest.fn(() => Promise.resolve(RESULT));

    await createRepoGithub(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN, MOCKED_FETCH);

    expect(RESULT.json).toHaveBeenCalledTimes(1);
    expect(MOCKED_FETCH).toHaveBeenCalledTimes(1);
  });

  it('should called createRepoGithub with throw error Bad credentials', async () => {
    const BAD_CREDENTIAL_RESULT = {
      json: jest.fn(() => ({ message: 'Bad credentials' })),
    };
    const MOCKED_FETCH = jest.fn(() => Promise.resolve(BAD_CREDENTIAL_RESULT));

    try {
      await createRepoGithub(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN, MOCKED_FETCH);
    } catch (error) {
      expect(error.message).toBe('Bad credentials');
    }
    expect(BAD_CREDENTIAL_RESULT.json).toHaveBeenCalledTimes(1);
    expect(MOCKED_FETCH).toHaveBeenCalledTimes(1);
  });

  it('should run fetch instead of mockFetch successfully', async () => {
    await createRepoGithub(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN);
  });
});
