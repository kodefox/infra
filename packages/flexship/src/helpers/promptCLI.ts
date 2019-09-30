import inquirer from 'inquirer';

// type Record<K extends string, T> = { [P in K]: T; }

export default async function promptCLI<N = string>(
  name: N,
  type: string,
  message: string,
) {
  // @ts-ignore : Type 'N' does not satisfy the constraint 'string'.
  let result: Record<N, string> = await inquirer.prompt([
    {
      type: type,
      name: name,
      message: message,
      validate: (answer: string) => {
        if (answer.trim() === '') {
          return `${name} can't be empty`;
        }
        return true;
      },
    },
  ]);
  return result;
}
