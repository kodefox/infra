import inquirer from 'inquirer';

export function validate(answer: string) {
  if (answer.trim() === '') {
    return `Answer can't be empty`;
  }
  return true;
}

export default async function promptCLI<N = string>(
  name: N,
  type: string,
  message: string,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore : Type 'N' does not satisfy the constraint 'string'.
  let result: Record<N, string> = await inquirer.prompt([
    {
      type: type,
      name: name,
      message: message,
      validate,
    },
  ]);
  return result;
}
