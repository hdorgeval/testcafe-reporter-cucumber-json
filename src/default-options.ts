import { CliArgs } from './command-line-args';

export interface ReporterOption {
  noisyTags: string[];
  verbose: boolean;

  args?: Partial<CliArgs>;
}
export const defaultOptions: ReporterOption = {
  args: {
    appName: false,
    appVersion: false,
    reportFolder: 'cucumber-json-reports',
  },
  noisyTags: [
    '(t)',
    'able',
    'and',
    'async',
    'but',
    'can',
    'cannot',
    'did',
    'feature',
    'fixture',
    'given',
    'not',
    'only',
    'scenario',
    'should',
    'spec',
    'test',
    'the',
    'then',
    'when',
    'with',
  ],
  verbose: false,
};
