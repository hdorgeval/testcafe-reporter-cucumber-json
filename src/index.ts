import { CucumberJsonReport } from './cucumber-json';
import { extendedReporterPlugin } from './reporter';
import { CallsiteError, TestRunInfo } from './reporter-interface';

exports['default'] = () => {
  const report = new CucumberJsonReport();
  return {
    reportFixtureStart(name: string, path: string) {
      extendedReporterPlugin.reportFixtureStart.call(this, name, path, report);
    },
    reportTaskDone(endTime: Date, passed: number, warnings: string[]) {
      extendedReporterPlugin.reportTaskDone.call(this, endTime, passed, warnings, report);
    },
    reportTaskStart(startTime: Date, userAgents: string[], testCount: number) {
      extendedReporterPlugin.reportTaskStart.call(
        this,
        startTime,
        userAgents,
        testCount,
        report,
      );
    },
    reportTestDone(name: string, testRunInfo: TestRunInfo) {
      extendedReporterPlugin.reportTestDone.call(this, name, testRunInfo, report);
    },
    renderErrors(errs: CallsiteError[]) {
      return extendedReporterPlugin.renderErrors.call(this, errs);
    },
    createErrorDecorator() {
      return extendedReporterPlugin.createErrorDecorator.call(this);
    },
  };
};

module.exports = exports['default'];
