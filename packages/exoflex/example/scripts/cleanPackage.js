const exec = require('child_process').exec;

const COMMANDS = [
  'rm -rf node_modules/exoflex/node_modules',
  'rm -rf node_modules/exoflex/coverage',
  'rm -rf node_modules/exoflex/example',
];

COMMANDS.forEach((command) => {
  exec(command, (error) => {
    if (error) {
      console.log('Failed executing: ', command, '\nError: ', error);
    }
  });
});
