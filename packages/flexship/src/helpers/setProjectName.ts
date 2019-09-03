import writeJsonFile from 'write-json-file';
import loadJsonFile from 'load-json-file';

export default async (projectName: string) => {
  let jsonPath = `./${projectName}/package.json`;
  let packageJson = await loadJsonFile<{ name: string }>(jsonPath);
  packageJson.name = projectName;
  await writeJsonFile(jsonPath, packageJson);
};
