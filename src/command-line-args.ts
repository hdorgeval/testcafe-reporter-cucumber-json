import { options } from './options';
import minimist, { ParsedArgs } from 'minimist';
const args: ParsedArgs = minimist(process.argv.slice(2));
const optionsFromConfigurationFile = options;

export const cliArgs = {
  ...args,
  appName: args['reporter-app-name'] || optionsFromConfigurationFile.args?.appName,
  appVersion:
    args['reporter-app-version'] || optionsFromConfigurationFile.args?.appVersion,
  reportFolder:
    args['reporter-json-folder'] || optionsFromConfigurationFile.args?.reportFolder,
  rawCommandLine: process.argv.join(' '),
} as CliArgs;

export interface CliArgs extends ParsedArgs {
  appName: string | false;
  appVersion: string | false;
  reportFolder: string | false;
  rawCommandLine: string;
}
