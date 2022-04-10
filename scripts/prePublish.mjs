import { join } from 'path';
import childProcess from 'child_process';
import { promisify } from 'util';
import { promises } from 'fs';

const exec = promisify(childProcess.exec);

(async () => {
  const upgradeType = process.argv[3] || 'patch';
  const rootPath = join(__dirname, '..');

  const apiPath = join(rootPath, 'api');
  const { stdout } = await exec(`npm version ${upgradeType}`, { cwd: apiPath });
  const match = /v(.*)\n?/.exec(stdout);
  if (!match[1]) {
    throw new Error(`Could not detect version from stdout: '${stdout}'`);
  }
  const newApiVersion = match[1];

  const appPath = join(rootPath, 'app');
  const appPackageJsonPath = join(appPath, 'package.json');
  const appPackageJsonBuffer = await promises.readFile(appPackageJsonPath);
  const appPackageJsonText = appPackageJsonBuffer
    .toString()
    .replace(/"spine-api":(\s*)".*"(\s*),/, `"spine-api":$1"^${newApiVersion}"$2,`);
  await promises.writeFile(appPackageJsonPath, Buffer.from(appPackageJsonText));
})()
  .then(() => {
    console.log('PrePublish completed');
  })
  .catch((e) => {
    console.error('PrePublish failed', e);
    process.exit(1);
  });
