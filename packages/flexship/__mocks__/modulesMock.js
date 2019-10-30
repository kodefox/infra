jest.mock('child_process', () => ({
  spawn: () => ({
    on: jest.fn((event, listener) => listener(0)),
  }),
}));

jest.mock('inquirer', () => ({
  prompt: jest.fn((questions) => {
    if (Array.isArray(questions)) {
      questions[0].validate('test');
      let result = {
        [questions[0].name]: 'test',
      };
      return result;
    }
    throw new Error('question should be in array');
  }),
}));
