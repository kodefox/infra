import fs from 'fs';
import spawn from './spawn';

export async function readdir(): Promise<boolean> {
  return new Promise((resolve) => {
    fs.readdir(`${process.env.HOME}/.flexship`, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export default async function writeRootToken(githubToken: string) {
  let readdirResult = await readdir();

  if (readdirResult) {
    fs.writeFile(
      `${process.env.HOME}/.flexship/token`,
      githubToken,
      'utf8',
      function(err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Write Token Saved!');
        }
      },
    );
  } else {
    let commandMakeDir = 'mkdir';
    let argsMakeDir = [`${process.env.HOME}/.flexship`];
    await spawn(commandMakeDir, argsMakeDir);
    let commandTouchFile = 'touch';
    let argsTouchFile = [`${process.env.HOME}/.flexship/token`];
    await spawn(commandTouchFile, argsTouchFile);
    fs.appendFile(
      `${process.env.HOME}/.flexship/token`,
      githubToken,
      'utf8',
      function(err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Append Token Saved!');
        }
      },
    );
  }
}
