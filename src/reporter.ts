import { CucumberJsonReportInterface } from './cucumber-json-interfaces';
import {
  nativeFormatError,
  nativeNewLine,
  nativeSetIndent,
  nativeWrite,
} from './reporter-helpers';
import { CallsiteError, ExtendedReporterPlugin, TestRunInfo } from './reporter-interface';
import { filterStackFramesIn, getAllFilesIn, stackFramesOf } from './stack-frames-parser';
import { getStackTraceHeaderFrom } from './stack-trace-parser';
import * as chalk from 'chalk';

export const extendedReporterPlugin: ExtendedReporterPlugin = {
  reportTaskStart(
    startTime: Date,
    userAgents: string[],
    testCount: number,
    report: CucumberJsonReportInterface,
  ) {
    if (report) {
      report.initializeWith(startTime, userAgents, testCount);
    }
  },
  reportFixtureStart(name: string, path: string, report: CucumberJsonReportInterface) {
    report.createFeature(name, path);
  },
  reportTestDone(
    name: string,
    testRunInfo: TestRunInfo,
    report: CucumberJsonReportInterface,
  ) {
    let formattedErrorMessage: string | undefined;
    if (Array.isArray(testRunInfo.errs) && testRunInfo.errs.length > 0) {
      formattedErrorMessage = this.renderErrors(testRunInfo.errs);
    }

    const screenshots: string[] = [];
    if (Array.isArray(testRunInfo.screenshots) && testRunInfo.screenshots.length > 0) {
      testRunInfo.screenshots.forEach((img) => screenshots.push(img.screenshotPath));
    }

    report
      .createScenario(name, testRunInfo)
      .withError(formattedErrorMessage)
      .withScreenshots(screenshots);
  },
  reportTaskDone(
    endTime: Date,
    passed: number,
    warnings: string[],
    report: CucumberJsonReportInterface,
  ) {
    if (report) {
      report.finalizeWith(endTime, passed, warnings);
      report.writeFile();
      return;
    }
  },
  chalk: chalk.default,
  formatError: (err: CallsiteError, prefix: string) => {
    return nativeFormatError(err, prefix);
  },
  newline: () => {
    return nativeNewLine();
  },
  setIndent: (val: number) => {
    return nativeSetIndent(val);
  },
  write: (text: string) => {
    return nativeWrite(text);
  },
  renderErrors(errs: CallsiteError[]): string {
    if (!Array.isArray(errs)) {
      reportUnexpectedErrObject(errs);
      return 'Error: reporter cucumber-json has detected an unexpected error object. Please see details in the console logs';
    }

    const originalStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 100;
    const lines: string[] = [];
    errs.map((err, idx) => {
      const prefix = this.chalk.red(`${idx + 1}) `);

      if (err && typeof err.callsite === 'string') {
        reportUnexpectedErrObject(err);
        lines.push(renderNativeError(() => this.formatError(err, prefix)));
        return;
      }

      if (!err.callsite) {
        reportUnexpectedErrObject(err);
        lines.push(renderNativeError(() => this.formatError(err, prefix)));
        return;
      }

      filterStackFramesIn(err.callsite);
      const originalStackFrames = [...err.callsite.stackFrames];
      const files = getAllFilesIn(err.callsite);
      let stackTraceHeader: string;
      files.map((filename: string, index: number) => {
        err.callsite.stackFrames = stackFramesOf(filename).in(originalStackFrames);
        err.callsite.filename = filename;
        err.callsite.lineNum = err.callsite.stackFrames[0].getLineNumber() - 1;
        const stackTrace = this.formatError(err, prefix);

        if (index === 0) {
          lines.push(stackTrace);
          stackTraceHeader = getStackTraceHeaderFrom(stackTrace);
          return;
        }
        if (stackTraceHeader) {
          const truncatedStackTrace = stackTrace.replace(stackTraceHeader, '');
          lines.push(truncatedStackTrace);
          return;
        }
        lines.push(stackTrace);
      });
    });

    Error.stackTraceLimit = originalStackTraceLimit;
    return lines.join('\n');
  },
  createErrorDecorator() {
    let hasShownError = false;
    const lineSeparator = '--------------------------------------------\n';
    return {
      a: (str: string) => `"${this.chalk.underline(str)}"`,
      'a screenshot-path': (str: string) => this.chalk.grey.underline(str),
      code: (str: string) => str,
      'div code-frame': (str: string) => str,
      'div code-line': (str: string) => {
        if (hasShownError) {
          hasShownError = false;
          return `${str}\n${lineSeparator}`;
        }
        return `${str}\n`;
      },
      'div code-line-last': (str: string) => str,
      'div code-line-num': (str: string) => `   ${str} |`,
      'div code-line-num-base': (str: string) => {
        hasShownError = true;
        return lineSeparator + this.chalk.bgRed(` &rarr; ${str} `) + '|';
      },
      'div code-line-src': (str: string) => str,
      'div message': (str: string) => this.chalk.bold.red(str),
      'div screenshot-info': (str: string) => str,
      'div stack': (str: string) => '\n\n' + str,
      'div stack-line': (str: string) => str + '\n',
      'div stack-line-last': (str: string) => str,
      'div stack-line-location': (str: string) => ` (${this.chalk.grey.underline(str)})`,
      'div stack-line-name': (str: string) => `   at ${this.chalk.bold(str)}`,
      'span subtitle': (str: string) => `- ${this.chalk.bold.red(str)} -`,
      'span syntax-comment': (str: string) => this.chalk.grey.bold(str),
      'span syntax-invalid': (str: string) => this.chalk.inverse(str),
      'span syntax-keyword': (str: string) => this.chalk.cyan(str),
      'span syntax-number': (str: string) => this.chalk.magenta(str),
      'span syntax-punctuator': (str: string) => this.chalk.grey(str),
      'span syntax-regex': (str: string) => this.chalk.magenta(str),
      'span syntax-string': (str: string) => this.chalk.green(str),
      'span user-agent': (str: string) => this.chalk.grey(str),
      strong: (str: string) => this.chalk.bold(str),
    };
  },
};

function reportUnexpectedErrObject(err: CallsiteError | unknown) {
  if (err && (err as CallsiteError).isTestCafeError) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: cannot render errors because the error object has an unexpected content`,
  );
  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: please provide the following log to github.com/hdorgeval/testcafe-reporter-cucumber-json :`,
  );
  // eslint-disable-next-line no-console
  console.warn(`testcafe-reporter-cucumber-json :`, { err });
}

function renderNativeError(formatter: () => string): string {
  let nativeMessage: string;
  try {
    nativeMessage = formatter();
  } catch (error) {
    nativeMessage = error.message || `${error}`;
  }

  const formattedErrorMessage = nativeMessage.replace(/>/gi, '&rarr;');
  return formattedErrorMessage;
}
