import { PathLike, WriteFileOptions } from 'fs';
import writeRootToken from '../writeRootToken';

const MOCK_GITHUB_TOKEN = 'githubToken';

const CONSOLE_SPY = jest.spyOn(console, 'log').mockImplementation(() => '');
const CONSOLE_ERROR_SPY = jest
  .spyOn(console, 'error')
  .mockImplementation(() => '');

let readdirSuccess = true;
let writeFileSuccess = true;
let appendFileSuccess = true;

jest.mock('fs', () => ({
  readdir: jest.fn(
    (path: PathLike, callback: (err?: NodeJS.ErrnoException) => void) => {
      let err = new Error('mocked readdir error');
      readdirSuccess ? callback() : callback(err);
    },
  ),
  writeFile: jest.fn(
    (
      path: PathLike,
      data: string,
      options: WriteFileOptions,
      callback: (err?: NodeJS.ErrnoException) => void,
    ) => {
      let err = new Error('mocked writeFile error');
      writeFileSuccess ? callback() : callback(err);
    },
  ),
  appendFile: jest.fn(
    (
      file: PathLike,
      data: string,
      options: WriteFileOptions,
      callback: (err?: NodeJS.ErrnoException) => void,
    ) => {
      let err = new Error('mocked appendFile error');
      appendFileSuccess ? callback() : callback(err);
    },
  ),
}));

describe('writeRootToken', () => {
  afterAll(() => {
    CONSOLE_ERROR_SPY.mockRestore();
    CONSOLE_SPY.mockRestore();
  });

  it('should called writeRootToken and successfully called readdir function', async () => {
    readdirSuccess = true;
    writeFileSuccess = true;
    appendFileSuccess = false;
    await writeRootToken(MOCK_GITHUB_TOKEN);
  });
  it('should called writeRootToken and failed called readdir function', async () => {
    readdirSuccess = false;
    writeFileSuccess = false;
    appendFileSuccess = true;
    await writeRootToken(MOCK_GITHUB_TOKEN);
  });
  it('should called writeRootToken and successfully called writeFile function', async () => {
    readdirSuccess = true;
    writeFileSuccess = true;
    appendFileSuccess = false;
    await writeRootToken(MOCK_GITHUB_TOKEN);
  });
  it('should called writeRootToken and failed called writeFile function', async () => {
    readdirSuccess = true;
    writeFileSuccess = false;
    appendFileSuccess = false;
    await writeRootToken(MOCK_GITHUB_TOKEN);
  });
  it('should called writeRootToken and successfully called appendFile function', async () => {
    readdirSuccess = false;
    writeFileSuccess = false;
    appendFileSuccess = true;
    await writeRootToken(MOCK_GITHUB_TOKEN);
  });
  it('should called writeRootToken and failed called appendFile function', async () => {
    readdirSuccess = false;
    writeFileSuccess = false;
    appendFileSuccess = false;
    await writeRootToken(MOCK_GITHUB_TOKEN);
  });
});
