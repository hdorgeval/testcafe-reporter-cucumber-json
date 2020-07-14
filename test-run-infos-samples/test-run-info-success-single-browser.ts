import { TestRunInfo } from '../src/reporter-interface';

export const testRunInfoSingleBrowserNoError: TestRunInfo = {
  errs: [],
  warnings: [],
  durationMs: 4315,
  screenshotPath: null,
  screenshots: [],
  videos: [],
  skipped: false,
  browsers: [
    {
      testRunId: 'fy8OPVpRG',
      name: 'Chrome',
      version: '83.0.4103.116',
      platform: 'desktop',
      os: [Object],
      engine: [Object],
      prettyUserAgent: 'Chrome 83.0.4103.116 / macOS 10.15.5',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
      alias: 'chrome',
      headless: false,
    },
  ],
};
