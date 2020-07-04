import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs = {
  ...args,
  appName: args['reporter-app-name'],
  appVersion: args['reporter-app-version'],
  reportFolder: args['reporter-json-folder'],
  rawCommandLine: process.argv.join(' '),
} as CliArgs;

if (cliArgs.appName === undefined) {
  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: cannot get the App name from the command-line`,
  );
  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: add the option --reporter-app-name='My App'`,
  );
}

if (cliArgs.appVersion === undefined) {
  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: cannot get the App version from the command-line`,
  );
  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: add the option --reporter-app-version='x.y.z'`,
  );
}
export interface CliArgs extends ParsedArgs {
  appName: string;
  appVersion: string;
  reportFolder: string;
  rawCommandLine: string;
}
