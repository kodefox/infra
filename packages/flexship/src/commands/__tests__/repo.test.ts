import { handler } from '../repo';

type ErrorType = 'invalid token' | 'unexpected' | 'no error';
let errorType: ErrorType = 'invalid token';

const RESULT = {
  json: jest.fn(() => ({ message: 'success' })),
};

jest.mock('node-fetch', () => () => Promise.resolve(RESULT));

jest.mock('../../helpers/getRootToken', () => ({
  default: jest.fn(() =>
    Promise.resolve(errorType === 'no error' ? 'githubToken' : ''),
  ),
}));

jest.mock('../../helpers/createRepoGithub', () => ({
  default: jest.fn(() => {
    switch (errorType) {
      case 'invalid token':
        return Promise.reject({ message: 'Bad credentials' });
      case 'unexpected':
        return Promise.reject({ message: 'Unexpected error' });
      default:
        return Promise.resolve(RESULT);
    }
  }),
}));

const CONSOLE_SPY = jest.spyOn(console, 'log').mockImplementation(() => '');
const CONSOLE_ERROR_SPY = jest
  .spyOn(console, 'error')
  .mockImplementation(() => '');

describe('repo', () => {
  afterAll(() => {
    CONSOLE_ERROR_SPY.mockRestore();
    CONSOLE_SPY.mockRestore();
  });

  it('should failed because bad credentials', async () => {
    errorType = 'invalid token';
    try {
      await handler();
    } catch (error) {
      expect(error.message).toBe('Error: Bad credentials');
    }

    console.log('1');
  });

  it('should catch unexpected error', async () => {
    errorType = 'unexpected';
    try {
      await handler();
    } catch (error) {
      expect(error.message).toBe('Error: Unexpected error');
    }

    console.log('2');
  });

  it('should success with mocked token', async () => {
    errorType = 'no error';
    await handler();
    console.log('3');
  });
});
