import fs from 'fs';

async function readFile(): Promise<string> {
  return new Promise((resolve) => {
    fs.readFile(
      `${process.env.HOME}/.flexship/token`,
      'utf8',
      (error, data) => {
        if (error) {
          resolve('');
        } else {
          resolve(data);
        }
      },
    );
  });
}

export default async function getRootToken(): Promise<string> {
  let readFileResult: string = await readFile();
  return readFileResult;
}
