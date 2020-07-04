import { cliArgs } from './command-line-args';
import {
  Browser,
  CucumberJsonReportInterface,
  FeatureReport,
  NameVersion,
  Platform,
  Scenario,
  Step,
  StepStatus,
  Tag,
  testcafeDefaultStep,
  Metadata,
} from './cucumber-json-interfaces';
import {
  toBase64DataImageUrl,
  writeReportSync,
  userAgentToFilename,
  dateToFilename,
} from './fs';
import { TestRunInfo } from './reporter-interface';
import { distinct, tagsFromDescription } from './tags-parser';
import { getBrowserFrom, getDeviceFrom, getPlatformFrom } from './user-agent-parser';
export class CucumberJsonReport implements CucumberJsonReportInterface {
  private _startTime: Date = new Date();
  private _endTime: Date = new Date();
  private _userAgents: string[] = [];
  private _testCount = 0;
  private _passed!: number;
  private _warnings!: string[];
  private _features: FeatureReport[] = [];
  private _currentFeature: FeatureReport | undefined;
  private _currentScenario: Scenario | undefined;
  private _currentStep: Step | undefined;
  private _currentPlatform!: Platform;
  private _currentApp!: NameVersion;
  private _currentBrowser!: Browser;
  private _currentDevice = 'unknown';

  private _storageFolder: string = cliArgs.reportFolder || 'cucumber-json-reports';

  public get currentFeature(): FeatureReport | undefined {
    return this._currentFeature;
  }
  public set currentFeature(v: FeatureReport | undefined) {
    if (v === undefined) {
      return;
    }
    this._currentFeature = v;
    this._features.push(v);
    this._currentScenario = undefined;
  }
  public get currentScenario(): Scenario | undefined {
    return this._currentScenario;
  }
  public set currentScenario(v: Scenario | undefined) {
    if (v === undefined) {
      return;
    }
    this._currentScenario = v;
    if (this._currentFeature && this._currentFeature.elements) {
      this._currentFeature.elements.push(v);
    }
  }

  public get currentStep(): Step | undefined {
    return this._currentStep;
  }
  public set currentStep(v: Step | undefined) {
    if (v === undefined) {
      return;
    }
    this._currentStep = v;
    if (this.currentScenario && this.currentScenario.steps) {
      this.currentScenario.steps.push(v);
    }
    if (v.result && v.result.status === 'failed' && this.currentScenario) {
      this.currentScenario.status = 'failed';
    }
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
    this._currentStep = undefined;
    this._currentPlatform = getPlatformFrom(userAgents[0]);
    this._currentDevice = getDeviceFrom(userAgents[0]);
    this._currentBrowser = getBrowserFrom(userAgents[0]);
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
    if (this.currentFeature) {
      this.currentFeature.runInfo = {
        endTime: this._endTime,
        passed: this._passed,
        startTime: this._startTime,
        testCount: this._testCount,
        userAgents: this._userAgents,
        warnings: this._warnings,
      };
    }
    return this;
  };
  public toJson = (): string => {
    try {
      const json = JSON.stringify(this._features, null, 2);
      return json;
    } catch (error) {
      return JSON.stringify(error, null, 2);
    }
  };

  public writeFile = (): void => {
    this._userAgents.map((userAgent) => {
      this._features.forEach((feature) => {
        const metadata = feature.metadata as Metadata;
        metadata.browser = getBrowserFrom(userAgent);
        metadata.device = getDeviceFrom(userAgent);
        metadata.platform = getPlatformFrom(userAgent);
      });

      const browser = userAgentToFilename(userAgent);
      const time = dateToFilename(this._endTime);
      const fileName = [browser, '-', time, '.json'].join('');

      writeReportSync(this.toJson(), this._storageFolder, fileName);
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
    const featureReport: FeatureReport = {
      description: name || '',
      elements: [],
      id: this.getFeatureIdFrom(name),
      keyword: 'Feature',
      line: 0,
      metadata: {
        app: this._currentApp,
        browser: this._currentBrowser,
        device: this._currentDevice,
        platform: this._currentPlatform,
        date: new Date(),
      },
      name: name
        ? name.replace('Feature:', '').replace('Feature :', '').trim()
        : 'undefined',
      runInfo: undefined,
      skipped: false,
      tags: tagsFromDescription(name),
      uri: `${path}:${index + 1}`,
    };
    this.currentFeature = featureReport;
    return this;
  };
  public createScenario = (
    name: string,
    testRunInfo: TestRunInfo,
  ): CucumberJsonReportInterface => {
    const scenarioId = this.getScenarioIdFrom(name);
    const scenario: Scenario = {
      id: `Scenario${scenarioId}`,
      keyword: 'Scenario',
      line: 0,
      name: name
        ? name.replace('Scenario:', '').replace('Scenario :', '').trim()
        : 'undefined',
      skipped: testRunInfo.skipped,
      sourceLine: 'undefined',
      status: 'passed',
      steps: [],
      tags: [],
      type: 'scenario',
      uri: '',
    };
    this.currentScenario = scenario;
    this.currentStep = this.createDefaultStep(name, testRunInfo);
    this.currentScenario.status = this.currentStep.result.status;
    this.addTagsToCurrentFeature(tagsFromDescription(name));
    return this;
  };
  public withError = (error: string | undefined): CucumberJsonReportInterface => {
    if (this.currentStep && error) {
      this.currentStep.result.error_message = error;
    }
    return this;
  };
  public withScreenshots = (paths: string[] | undefined): CucumberJsonReportInterface => {
    if (Array.isArray(paths) && paths.length > 0 && this.currentStep) {
      this.currentStep.image = paths.map(toBase64DataImageUrl);
    }
    return this;
  };

  private createDefaultStep = (name: string, testRunInfo: TestRunInfo): Step => {
    let stepStatus: StepStatus = testRunInfo.skipped ? 'skipped' : 'passed';
    if (testRunInfo.errs && testRunInfo.errs.length > 0) {
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
        location: `${this.currentFeature.uri}:${sourceLineIndex || 0}`,
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

  private addTagsToCurrentFeature = (tags: Tag[]): void => {
    if (this.currentFeature === undefined) {
      return;
    }
    const currentFeatureTagNames = this.currentFeature.tags.map((tag) => tag.name);

    const toBeAddedTagNames = tags.map((tag) => tag.name);

    const aggregatedTagNames = distinct([
      ...currentFeatureTagNames,
      ...toBeAddedTagNames,
    ]);

    this.currentFeature.tags = aggregatedTagNames.map((tagName) => ({
      line: 0,
      name: tagName,
    }));
  };
}
