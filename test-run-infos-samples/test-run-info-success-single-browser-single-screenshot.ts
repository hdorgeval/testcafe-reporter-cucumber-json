import { TestRunInfo } from '../src/reporter-interface';

export const testRunInfoSuccessSingleBrowserSingleScreenshot: TestRunInfo = {
  errs: [],
  warnings: [],
  durationMs: 3611,
  screenshotPath:
    'screenshots/2020-07-13_21-43-20/test-2/Chrome_83.0.4103.116_macOS_10.15.5/1.png',
  screenshots: [
    {
      testRunId: 'pFLE33146',
      screenshotPath:
        'screenshots/2020-07-13_21-43-20/test-2/Chrome_83.0.4103.116_macOS_10.15.5/1.png',
      thumbnailPath:
        'screenshots/2020-07-13_21-43-20/test-2/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/1.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
  ],
  videos: [],
  skipped: false,
  browsers: [
    {
      testRunId: 'pFLE33146',
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
