import promptCLI, { validate } from '../promptCLI';

const MOCK_REPO_NAME = 'test';
const MOCK_TYPE = 'input';
const MOCK_MESSAGE = 'message';

const CONSOLE_SPY = jest.spyOn(console, 'log').mockImplementation(() => '');
const CONSOLE_ERROR_SPY = jest
  .spyOn(console, 'error')
  .mockImplementation(() => '');

describe('promptCLI', () => {
  afterAll(() => {
    CONSOLE_ERROR_SPY.mockRestore();
    CONSOLE_SPY.mockRestore();
  });

  it('should called promptCLI and return string', async () => {
    let result = await promptCLI<'MOCK_REPO_NAME'>(
      'MOCK_REPO_NAME',
      MOCK_TYPE,
      MOCK_MESSAGE,
    );
    expect(Object.keys(result).includes('MOCK_REPO_NAME')).toBeTruthy();
    expect(result['MOCK_REPO_NAME']).toBe(MOCK_REPO_NAME);
  });
});

describe('validate', () => {
  it('should run validate with empty string as the answer', () => {
    expect(validate('')).toBe(`Answer can't be empty`);
  });
});
