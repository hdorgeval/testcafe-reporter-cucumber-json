import minimist, { ParsedArgs } from "minimist";
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs  = {
  ...args,
  appName: args["reporter-app-name"],
  appVersion: args["reporter-app-version"],
  rawCommandLine: process.argv.join(" "),
} as ICliArgs;

if (cliArgs.appName === undefined) {
  // tslint:disable-next-line:no-console
  console.warn(`testcafe-reporter-cucumber-json: cannot get the App name from the command-line`);
  // tslint:disable-next-line:no-console
  console.warn(`testcafe-reporter-cucumber-json: add the option --reporter-app-name='My App'`);
}

if (cliArgs.appVersion === undefined) {
  // tslint:disable-next-line:no-console
  console.warn(`testcafe-reporter-cucumber-json: cannot get the App version from the command-line`);
  // tslint:disable-next-line:no-console
  console.warn(`testcafe-reporter-cucumber-json: add the option --reporter-app-version='x.y.z'`);
}
export interface ICliArgs extends ParsedArgs {
  appName: string;
  appVersion: string;
  rawCommandLine: string;
}
