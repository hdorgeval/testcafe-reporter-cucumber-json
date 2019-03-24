export interface ReporterOption {
  noisyTags: string[];
  verbose: boolean;
}
export const defaultOptions: ReporterOption = {
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
