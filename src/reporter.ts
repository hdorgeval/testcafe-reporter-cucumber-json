import * as chalk from "chalk";
import { ICucumberJsonReport } from "./cucumber-json-interface";
import {nativeFormatError, nativeNewLine, nativeSetIndent, nativeWrite} from "./reporter-helpers";
import { IError, IExtendedReporterPlugin, ITestRunInfo } from "./reporter-interface";
import { filterStackFramesIn, getAllFilesIn, stackFramesOf } from "./stack-frames-parser";
import { getStackTraceHeaderFrom } from "./stack-trace-parser";

export const extendedReporterPlugin: IExtendedReporterPlugin = {
    reportTaskStart(startTime: Date, userAgents: string[], testCount: number, report: ICucumberJsonReport ) {
        if (report) {
            report.initializeWith(startTime, userAgents, testCount);
        }
    },
    reportFixtureStart(name: string, path: string, report: ICucumberJsonReport) {
        report.createFeature(name, path);
    },
    reportTestDone(name: string, testRunInfo: ITestRunInfo, report: ICucumberJsonReport) {
        if (testRunInfo.errs && testRunInfo.errs.length > 0) {
            const formattedErrorMessage = this.renderErrors(testRunInfo.errs);
            const screenshotPaths = testRunInfo.errs
                                    .map ((err: IError) => err.screenshotPath)
                                    .filter((path) => path.endsWith(".png"));
            report
                .createScenario(name, testRunInfo)
                .withError(formattedErrorMessage)
                .withScreenshots(screenshotPaths);
            return;
        }
        report.createScenario(name, testRunInfo);
    },
    reportTaskDone(endTime: Date, passed: number, warnings: string[], report: ICucumberJsonReport) {
        if (report) {
            const result = report
                    .finalizeWith(endTime, passed, warnings)
                    .toJson();
            this.write(result);
            return;
        }
        this.write("[]");
    },
    chalk: chalk.default,
    formatError: (err: any, prefix: string) => {
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
    renderErrors(errs: IError[]): string {
        const originalStackTraceLimit = Error.stackTraceLimit;
        Error.stackTraceLimit = 100;
        const lines: string[] = [];
        errs
            .map((err: IError, idx: number) => {
                const prefix = this.chalk.red(`${idx + 1}) `);
                filterStackFramesIn(err.callsite);
                const originalStackFrames = [...err.callsite.stackFrames];
                const files = getAllFilesIn(err.callsite);
                let stackTraceHeader: string;
                files.map( (filename: string, index: number) => {
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
                        const truncatedStackTrace = stackTrace.replace(stackTraceHeader, "");
                        lines.push(truncatedStackTrace);
                        return;
                    }
                    lines.push(stackTrace);

                });
            });

        Error.stackTraceLimit = originalStackTraceLimit;
        return lines.join("\n");
    },
    createErrorDecorator() {
        let hasShownError: boolean = false;
        const lineSeparator = "--------------------------------------------\n";
        return {
            "a":                       (str: string) => `"${this.chalk.underline(str)}"`,
            "a screenshot-path":       (str: string) => this.chalk.grey.underline(str),
            "code":                    (str: string) => str,
            "div code-frame":          (str: string) => str,
            "div code-line":           (str: string) => {
                if (hasShownError) {
                    hasShownError = false;
                    return `${str}\n${lineSeparator}`;
                }
                return `${str}\n`;
            },
            "div code-line-last":      (str: string) => str,
            "div code-line-num":       (str: string) => `   ${str} |`,
            "div code-line-num-base":  (str: string) => {
                hasShownError = true;
                return lineSeparator + this.chalk.bgRed(` &rarr; ${str} `) + "|";
            },
            "div code-line-src":       (str: string) => str,
            "div message":             (str: string) => this.chalk.bold.red(str),
            "div screenshot-info":     (str: string) => str,
            "div stack":               (str: string) => "\n\n" + str,
            "div stack-line":          (str: string) => str + "\n",
            "div stack-line-last":     (str: string) => str,
            "div stack-line-location": (str: string) => ` (${this.chalk.grey.underline(str)})`,
            "div stack-line-name":     (str: string) => `   at ${this.chalk.bold(str)}`,
            "span subtitle":           (str: string) => `- ${this.chalk.bold.red(str)} -`,
            "span syntax-comment":     (str: string) => this.chalk.grey.bold(str),
            "span syntax-invalid":     (str: string) => this.chalk.inverse(str),
            "span syntax-keyword":     (str: string) => this.chalk.cyan(str),
            "span syntax-number":      (str: string) => this.chalk.magenta(str),
            "span syntax-punctuator":  (str: string) => this.chalk.grey(str),
            "span syntax-regex":       (str: string) => this.chalk.magenta(str),
            "span syntax-string":      (str: string) => this.chalk.green(str),
            "span user-agent":         (str: string) => this.chalk.grey(str),
            "strong":                  (str: string) => this.chalk.bold(str),
        };
    },
};
