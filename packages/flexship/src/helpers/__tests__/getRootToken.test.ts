import { PathLike } from 'fs';
import getRootToken from '../getRootToken';

const CONSOLE_SPY = jest.spyOn(console, 'log').mockImplementation(() => '');
const CONSOLE_ERROR_SPY = jest
  .spyOn(console, 'error')
  .mockImplementation(() => '');

let readFileSuccess = true;

jest.mock('fs', () => ({
  readFile: jest.fn(
    (
      path: PathLike,
      options: string,
      callback?: (err?: NodeJS.ErrnoException) => void,
    ) => {
      let err = new Error('mocked readFile error');
      callback && readFileSuccess ? callback() : callback(err);
    },
  ),
}));

describe('getRootToken', () => {
  afterAll(() => {
    CONSOLE_ERROR_SPY.mockRestore();
    CONSOLE_SPY.mockRestore();
  });

  it('should called getRootToken and successfully get token', async () => {
    readFileSuccess = true;
    await getRootToken();
  });
  it('should called getRootToken and get empty string', async () => {
    readFileSuccess = false;
    await getRootToken();
  });
});
