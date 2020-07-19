import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));

export const cliArgs = {
  ...args,
  appName: args['reporter-app-name'],
  appVersion: args['reporter-app-version'],
  reportFolder: args['reporter-json-folder'],
  rawCommandLine: process.argv.join(' '),
} as CliArgs;

export interface CliArgs extends ParsedArgs {
  appName: string;
  appVersion: string;
  reportFolder: string;
  rawCommandLine: string;
}
