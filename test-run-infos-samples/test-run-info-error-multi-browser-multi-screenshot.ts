/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TestRunInfo } from '../src/reporter-interface';

export const testRunInfoErrorMultiBrowserMultiScreenshot: TestRunInfo = {
  errs: [
    {
      userAgent: 'Firefox 78.0 / macOS 10.15',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/errors/1.png',
      testRunId: '7NO1y2nyO',
      testRunPhase: 'inTest',
      code: 'E2',
      type: 'uncaughtErrorOnPage',
      isTestCafeError: true,
      callsite: {
        render: () => Promise.resolve('foobar'),
        renderSync: () => 'foobar',
        filename: 'steps/a-xxx-message-should-appear-with-my-name.ts',
        lineNum: 34,
        callsiteFrameIdx: 0,
        stackFrames: [
          {
            getFileName: () => 'steps/a-xxx-message-should-appear-with-my-name.ts',
            fileName: 'steps/a-xxx-message-should-appear-with-my-name.ts',

            getLineNumber: () => 35,
            getColumnNumber: () => 11,
            lineNumber: 35,
            columnNumber: 11,
            source: '    at steps/a-xxx-message-should-appear-with-my-name.ts:35:11',
          },
          {
            functionName: 'fulfilled',
            getFileName: () => '',
            getLineNumber: () => 5,
            getColumnNumber: () => 58,
            fileName: 'steps/a-xxx-message-should-appear-with-my-name.ts',
            lineNumber: 5,
            columnNumber: 58,
            source:
              '    at fulfilled (steps/a-xxx-message-should-appear-with-my-name.ts:5:58)',
          },
          {
            getFileName: () => '',
            getLineNumber: () => 5,
            getColumnNumber: () => 58,
            functionName: '$$testcafe_test_run$$PRYQ1L33p$$',
            fileName: 'node_modules/testcafe/src/api/test-run-tracker.js',
            lineNumber: 76,
            columnNumber: 16,
            source:
              '    at $$testcafe_test_run$$PRYQ1L33p$$ (node_modules/testcafe/src/api/test-run-tracker.js:76:16',
          },
          {
            getFileName: () => '',
            getLineNumber: () => 5,
            getColumnNumber: () => 58,
            functionName: '$$testcafe_test_run$$PRYQ1L33p$$',
            fileName: 'node_modules/testcafe/src/api/test-run-tracker.js',
            lineNumber: 76,
            columnNumber: 16,
            source:
              '    at $$testcafe_test_run$$PRYQ1L33p$$ (node_modules/testcafe/src/api/test-run-tracker.js:76:16',
          },
        ],
        isV8Frames: false,
      },
      errMsg: 'Error: yo firefox',
      originError: `Error: yo firefox
          at / Users / HDO / VSCodeProjects / testcafe - starter / steps / a - xxx - message - should - appear -with-my - name.ts: 35: 11
          at Generator.next(<anonymous>)
          at fulfilled(/ Users / HDO / VSCodeProjects / testcafe - starter / steps / a - xxx - message - should - appear -with-my - name.ts: 5: 58)
at $$testcafe_test_run$$7NO1y2nyO$$(eval at addTrackingMarkerToFunction(/Users/HDO / VSCodeProjects / testcafe - starter / node_modules / testcafe / src / api / test - run - tracker.js: 76: 16), <anonymous>: 7: 39)
at $$testcafe_test_run$$7NO1y2nyO$$(eval at addTrackingMarkerToFunction(/Users/HDO / VSCodeProjects / testcafe - starter / node_modules / testcafe / src / api / test - run - tracker.js: 76: 16), <anonymous>: 7: 39)
`,
    },
  ],
  warnings: [],
  durationMs: 14917,
  screenshotPath: 'screenshots/2020-07-14_00-06-45/test-3',
  screenshots: [
    {
      testRunId: 'bQD2JMCQ4',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/1.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/1.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/1.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/thumbnails/1.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: 'bQD2JMCQ4',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/2.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/2.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/2.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/thumbnails/2.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/3.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/thumbnails/3.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: 'bQD2JMCQ4',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/3.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Chrome_83.0.4103.116_macOS_10.15.5/thumbnails/3.png',
      userAgent: 'Chrome_83.0.4103.116_macOS_10.15.5',
      quarantineAttempt: null,
      takenOnFail: false,
    },
    {
      testRunId: '7NO1y2nyO',
      screenshotPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/errors/1.png',
      thumbnailPath:
        'screenshots/2020-07-14_00-06-45/test-3/Firefox_78.0_macOS_10.15/errors/thumbnails/1.png',
      userAgent: 'Firefox_78.0_macOS_10.15',
      quarantineAttempt: null,
      takenOnFail: true,
    },
  ],
  videos: [],
  skipped: false,
  browsers: [
    {
      testRunId: 'bQD2JMCQ4',
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
    {
      testRunId: '7NO1y2nyO',
      name: 'Firefox',
      version: '78.0',
      platform: 'desktop',
      os: [Object],
      engine: [Object],
      prettyUserAgent: 'Firefox 78.0 / macOS 10.15',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0',
      alias: 'firefox',
      headless: false,
    },
  ],
};
