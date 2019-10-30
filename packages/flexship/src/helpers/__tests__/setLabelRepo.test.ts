import setLabelRepo, { addedLabels, deletedLabels } from '../setLabelRepo';

const MOCK_REPO_NAME = 'repoName';
const MOCK_GITHUB_TOKEN = 'githubToken';

const CONSOLE_SPY = jest.spyOn(console, 'log').mockImplementation(() => '');
const CONSOLE_ERROR_SPY = jest
  .spyOn(console, 'error')
  .mockImplementation(() => '');

jest.mock('node-fetch', () => () => Promise.resolve('success'));

describe('setLabelRepo', () => {
  afterAll(() => {
    CONSOLE_ERROR_SPY.mockRestore();
    CONSOLE_SPY.mockRestore();
  });

  it('should called setLabelRepo with resolved promise', async () => {
    const MOCKED_FETCH = jest.fn(() => Promise.resolve('success'));

    await setLabelRepo(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN, MOCKED_FETCH);

    let totalFetchCalled = addedLabels.length + deletedLabels.length;
    expect(MOCKED_FETCH).toHaveBeenCalledTimes(totalFetchCalled);
  });

  it('should called setLabelRepo with rejected promise', async () => {
    const MOCKED_FETCH = jest.fn(() => Promise.reject('error'));

    await setLabelRepo(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN, MOCKED_FETCH);

    let totalFetchCalled = addedLabels.length + deletedLabels.length;
    expect(MOCKED_FETCH).toHaveBeenCalledTimes(totalFetchCalled);
  });

  it('should catch unexpected error', async () => {
    const MOCKED_FETCH = jest.fn(() => {
      throw new Error('Unexpected');
    });

    await setLabelRepo(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN, MOCKED_FETCH);

    expect(MOCKED_FETCH).toHaveBeenCalledTimes(1);
  });

  it('should run fetch instead of mockFetch successfully', async () => {
    await setLabelRepo(MOCK_REPO_NAME, MOCK_GITHUB_TOKEN);
  });
});
