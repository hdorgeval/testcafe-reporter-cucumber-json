import { cliArgs } from './command-line-args';
import {
  CucumberJsonReportInterface,
  FeatureReport,
  Metadata,
  MultiBrowserFeatureReport,
  MultiBrowserScenario,
  NameVersion,
  Scenario,
  Step,
  StepStatus,
  testcafeDefaultStep,
} from './cucumber-json-interfaces';
import {
  toBase64DataImageUrl,
  writeReportSync,
  userAgentToFilename,
  dateToFilename,
} from './fs';
import { TestRunInfo, CallsiteError } from './reporter-interface';
import { distinct, tagsFromDescription } from './tags-parser';
import { getBrowserFrom, getDeviceFrom, getPlatformFrom } from './user-agent-parser';
export class CucumberJsonReport implements CucumberJsonReportInterface {
  private _startTime: Date = new Date();
  private _endTime: Date = new Date();
  private _userAgents: string[] = [];
  private _testCount = 0;
  private _passed!: number;
  private _warnings!: string[];
  private _features: MultiBrowserFeatureReport[] = [];
  private _currentFeature: MultiBrowserFeatureReport | undefined;
  private _currentScenario: MultiBrowserScenario | undefined;
  private _currentApp!: NameVersion;

  private _storageFolder: string = cliArgs.reportFolder || 'cucumber-json-reports';

  public get currentFeature(): MultiBrowserFeatureReport | undefined {
    return this._currentFeature;
  }
  public set currentFeature(v: MultiBrowserFeatureReport | undefined) {
    if (v === undefined) {
      return;
    }
    this._currentFeature = v;
    this._features.push(v);
    this._currentScenario = undefined;
  }
  public get currentScenario(): MultiBrowserScenario | undefined {
    return this._currentScenario;
  }
  public set currentScenario(v: MultiBrowserScenario | undefined) {
    if (v === undefined) {
      return;
    }
    this._currentScenario = v;
    this._userAgents.forEach((userAgent) => {
      if (this._currentFeature && this._currentFeature[userAgent]) {
        this._currentFeature[userAgent].elements.push(v[userAgent]);
      }
    });
  }

  public initializeWith = (
    startTime: Date,
    userAgents: string[],
    testCount: number,
  ): CucumberJsonReport => {
    this._startTime = startTime;
    this._userAgents = userAgents;
    this._testCount = testCount;
    this._features = [];
    this._currentFeature = undefined;
    this._currentScenario = undefined;
    this._currentApp = {
      name: cliArgs.appName,
      version: cliArgs.appVersion,
    };
    return this;
  };

  public finalizeWith = (
    endTime: Date,
    passed: number,
    warnings: string[],
  ): CucumberJsonReport => {
    this._endTime = endTime;
    this._passed = passed;
    this._warnings = warnings;
    this._userAgents.forEach((userAgent) => {
      if (this.currentFeature && this.currentFeature[userAgent]) {
        this.currentFeature[userAgent].runInfo = {
          endTime: this._endTime,
          passed: this._passed,
          startTime: this._startTime,
          testCount: this._testCount,
          userAgents: this._userAgents,
          warnings: this._warnings,
        };
      }
    });
    return this;
  };
  public toJson = (userAgent: string): string => {
    try {
      this._features.forEach((feature) => {
        if (feature[userAgent]) {
          (feature[userAgent].metadata as Metadata).reportTime = new Date();
        }
      });
      const features = this._features.map((f) => f[userAgent]);
      const json = JSON.stringify(features, null, 2);
      return json;
    } catch (error) {
      return JSON.stringify(error, null, 2);
    }
  };

  public writeJsonFiles = (): void => {
    this._userAgents.map((userAgent) => {
      const browser = userAgentToFilename(userAgent);
      const time = dateToFilename(this._endTime);
      const fileName = [browser, '-', time, '.json'].join('');

      writeReportSync(this.toJson(userAgent), this._storageFolder, fileName);
    });
  };

  public toInfo = (): string => {
    const result = `
            StartTime : ${this._startTime}
            EndTime   : ${this._endTime}
            UserAgents: ${this._userAgents}
            TestCount : ${this._testCount}
            Passed    : ${this._passed}
            Warnings  : ${this._warnings}
        `;
    return result;
  };
  public createFeature = (name: string, path: string): CucumberJsonReportInterface => {
    const index = 0;
    const newFeature: MultiBrowserFeatureReport = {};

    this._userAgents.forEach((userAgent) => {
      const featureReport: FeatureReport = {
        description: name || '',
        elements: [],
        id: this.getFeatureIdFrom(name),
        keyword: 'Feature',
        line: 0,
        metadata: {
          app: this._currentApp,
          browser: getBrowserFrom(userAgent),
          device: getDeviceFrom(userAgent),
          platform: getPlatformFrom(userAgent),
          reportTime: this._startTime,
          startTime: this._startTime,
        },
        name: name
          ? name.replace('Feature:', '').replace('Feature :', '').trim()
          : 'undefined',
        runInfo: undefined,
        skipped: false,
        tags: tagsFromDescription(name),
        uri: `${path}:${index + 1}`,
      };
      newFeature[userAgent] = featureReport;
    });

    this.currentFeature = newFeature;
    return this;
  };
  public createScenario = (
    name: string,
    testRunInfo: TestRunInfo,
  ): CucumberJsonReportInterface => {
    const newScenario: MultiBrowserScenario = {};
    this._userAgents.forEach((userAgent) => {
      const scenarioId = this.getScenarioIdFrom(name);
      const step = this.createDefaultStep(name, testRunInfo, userAgent);
      const scenarioTags = tagsFromDescription(name).map((tag) => tag.name);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const featureTags = this.currentFeature![userAgent].tags.map((tag) => tag.name);

      const aggregatedTags = distinct([...scenarioTags, ...featureTags]);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.currentFeature![userAgent].tags = aggregatedTags.map((tag) => ({
        line: 0,
        name: tag,
      }));

      const scenario: Scenario = {
        id: `Scenario${scenarioId}`,
        keyword: 'Scenario',
        line: 0,
        name: name
          ? name.replace('Scenario:', '').replace('Scenario :', '').trim()
          : 'undefined',
        skipped: testRunInfo.skipped,
        sourceLine: 'undefined',
        status: step.result.status,
        steps: [step],
        tags: [],
        type: 'scenario',
        uri: '',
      };

      newScenario[userAgent] = scenario;
    });

    this.currentScenario = newScenario;
    return this;
  };

  private getUserAgentFromBrowser(browser: string): string {
    const userAgent = this._userAgents.find((ua) => {
      if (ua.includes('https://')) {
        return ua.startsWith(`${browser} `);
      }
      return ua === browser;
    });

    if (userAgent === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        `Cannot match browser '${browser}' with '${this._userAgents.join(';')}'`,
      );
      return browser;
    }

    return userAgent;
  }

  public withBrowserError = (
    error: string | undefined,
    browser: string,
  ): CucumberJsonReportInterface => {
    if (!error) {
      return this;
    }

    const userAgent = this.getUserAgentFromBrowser(browser);
    const steps =
      this.currentScenario &&
      this.currentScenario[userAgent] &&
      this.currentScenario[userAgent].steps;

    if (!Array.isArray(steps)) {
      return this;
    }

    if (steps.length === 0) {
      return this;
    }

    const currentStep = steps[steps.length - 1];
    currentStep.result.error_message = error;

    return this;
  };

  public withBrowserScreenshots = (
    paths: string[] | undefined,
    browser: string,
  ): CucumberJsonReportInterface => {
    if (!Array.isArray(paths)) {
      return this;
    }

    if (paths.length === 0) {
      return this;
    }

    const userAgent = this.getUserAgentFromBrowser(browser);
    const steps =
      this.currentScenario &&
      this.currentScenario[userAgent] &&
      this.currentScenario[userAgent].steps;

    if (!Array.isArray(steps)) {
      return this;
    }

    if (steps.length === 0) {
      return this;
    }

    const currentStep = steps[steps.length - 1];
    currentStep.image = paths.map(toBase64DataImageUrl);

    return this;
  };

  private getTestRunErrorsForBrowser = (
    testRunInfo: TestRunInfo,
    browserName: string,
  ): CallsiteError[] => {
    if (!Array.isArray(testRunInfo.errs)) {
      return [];
    }

    if (testRunInfo.errs.length === 0) {
      return [];
    }

    const errors = testRunInfo.errs.filter((err) => err.userAgent === browserName);
    return errors;
  };

  private createDefaultStep = (
    name: string,
    testRunInfo: TestRunInfo,
    browserName: string,
  ): Step => {
    let stepStatus: StepStatus = testRunInfo.skipped ? 'skipped' : 'passed';
    const errs = this.getTestRunErrorsForBrowser(testRunInfo, browserName);
    if (errs && errs.length > 0) {
      stepStatus = 'failed';
    }

    const sourceLine = name;
    const sourceLineIndex = 0;

    const step: Step = {
      ...testcafeDefaultStep,
      name: sourceLine || 'undefined',
      result: {
        duration: testRunInfo.durationMs,
        error_message: undefined,
        status: stepStatus,
      },
      text: [`<a href="#">${sourceLine || ''}</a>`],
    };
    if (this.currentFeature) {
      step.match = {
        location: `${this.currentFeature[browserName].uri}:${sourceLineIndex || 0}`,
      };
    }
    return step;
  };

  private getScenarioIdFrom = (scenarioName: string): string => {
    const result =
      this.currentFeature && this.currentFeature.name
        ? `${this.currentFeature.name};${scenarioName}`
        : scenarioName;
    // TODO: ensure this generated id is unique: if not prefix with filename
    return result;
  };

  private getFeatureIdFrom = (featureName: string): string => {
    const result = featureName ? featureName : `Feature${this._features.length + 1}`;
    // TODO: ensure this generated id is unique: if not prefix with filename
    return result;
  };
}
