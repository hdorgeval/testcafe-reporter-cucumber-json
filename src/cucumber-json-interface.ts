export interface IFeatureReport {
    description: string;
    keyword: string;
    name: string;
    line: number;
    id: string;
    tags: ITag[];
    uri: string;
    elements: IScenario[];
    metadata: IMetadata | ICustomMetadata[];
    skipped: boolean;
    runInfo: IRunInfo | undefined;
}

export interface IRunInfo {
    startTime: Date;
    userAgents: string[];
    testCount: number;
    endTime: Date;
    passed: number;
    warnings: string[];
}
export interface ICustomMetadata {
    label?: string;
    name: string;
    value: string;
  }

export interface IScenario {
    id: string;
    keyword: string;
    line: number;
    name: string;
    tags: ITag[];
    type: string;
    steps: IStep[];
    status: StepStatus;
    sourceLine: string;
    uri: string;
    skipped: boolean;

  }

export interface IStep {
    keyword: string;
    name: string;
    result: IStepResult;
    hidden: boolean;
    match: IMatch;
    text: string;
    tags: ITag[];
    image: string | undefined;
  }
export interface IMatch {
    location: string;
}
export interface IStepResult {
    status: StepStatus;
    duration: number;
    error_message: string | undefined;
}

export type StepStatus =
  | "passed"
  | "failed"
  | "skipped"
  | "undefined";
export interface ITag {
    name: string;
    line: number;
}

export const testcafeDefaultStep: IStep = {
    hidden: false,
    image: undefined,
    keyword: ">",
    match: {
      location: "",
    },
    name: "_",
    result: {
      duration: 0,
      error_message: undefined,
      status: "passed",
    },
    tags: [],
    text: "text",
};

export interface ICustomReportData {
    title: string;
    data: IMetadata[];
}

export interface IConfiguration {
    sourceFiles: string;
    reportHeader: string;
    reportTitle: string;
    reportDir: string;
    reportTempDir: string;
    noisyTags: string[];
    punctuations: string[];
    verbose: boolean;
}

export interface ICucumberJsonReport {
    currentFeature: IFeatureReport | undefined;
    currentScenario: IScenario | undefined;
    currentStep: IStep | undefined;
    initializeWith: (startTime: Date, userAgents: string[], testCount: number) => this;
    finalizeWith: (endTime: Date, passed: number, warnings: string[]) => this;
    toJson: () => string;
    createFeature: (name: string, path: string) => this;
    createScenario: (name: string, testRunInfo: any) => this;
    withError: (error: string) => this;
    withScreenshot: (path: string | undefined) => this;
}

export interface IMetadata {
    app: INameVersion;
    browser: IBrowser;
    device: string;
    platform: IPlatform;

}
export interface IPlatform {
    name: PlatformName;
    version: string;
}

export interface INameVersion {
    name: string;
    version: string;
}

export interface IBrowser {
    name: BrowserName;
    version: string;
}

export type BrowserName =
| "internet explorer"
| "edge"
| "chrome"
| "firefox"
| "safari"
| "unknown"
;

export type PlatformName =
| "windows"
| "osx"
| "linux"
| "ubuntu"
| "android"
| "ios"
| "unknown"
;
