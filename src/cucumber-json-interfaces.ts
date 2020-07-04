import { TestRunInfo } from './reporter-interface';

export interface FeatureReport {
  description: string;
  elements: Scenario[];
  id: string;
  keyword: string;
  line: number;
  metadata: Metadata | CustomMetadata[];
  name: string;
  runInfo: RunInfo | undefined;
  skipped: boolean;
  tags: Tag[];
  uri: string;
}

export interface RunInfo {
  endTime: Date;
  passed: number;
  startTime: Date;
  testCount: number;
  userAgents: string[];
  warnings: string[];
}
export interface CustomMetadata {
  label?: string;
  name: string;
  value: string;
}

export interface Scenario {
  id: string;
  keyword: string;
  line: number;
  name: string;
  skipped: boolean;
  sourceLine: string;
  status: StepStatus;
  steps: Step[];
  tags: Tag[];
  type: string;
  uri: string;
}

export interface Step {
  hidden: boolean;
  image: string[] | undefined;
  keyword: string;
  match: Match;
  name: string;
  result: StepResult;
  tags: Tag[];
  text: string[];
}
export interface Match {
  location: string;
}
export interface StepResult {
  duration: number;
  error_message: string | undefined;
  status: StepStatus;
}

export type StepStatus = 'passed' | 'failed' | 'skipped' | 'undefined';
export interface Tag {
  line: number;
  name: string;
}

export const testcafeDefaultStep: Step = {
  hidden: false,
  image: undefined,
  keyword: '>',
  match: {
    location: '',
  },
  name: '_',
  result: {
    duration: 0,
    error_message: undefined,
    status: 'passed',
  },
  tags: [],
  text: ['text'],
};

export interface CustomReportData {
  data: Metadata[];
  title: string;
}
export interface CucumberJsonReportInterface {
  createFeature: (name: string, path: string) => CucumberJsonReportInterface;
  createScenario: (name: string, testRunInfo: TestRunInfo) => CucumberJsonReportInterface;
  currentFeature: FeatureReport | undefined;
  currentScenario: Scenario | undefined;
  currentStep: Step | undefined;
  finalizeWith: (
    endTime: Date,
    passed: number,
    warnings: string[],
  ) => CucumberJsonReportInterface;
  initializeWith: (
    startTime: Date,
    userAgents: string[],
    testCount: number,
  ) => CucumberJsonReportInterface;
  toJson: () => string;
  withError: (error: string | undefined) => CucumberJsonReportInterface;
  withScreenshots: (path: string[] | undefined) => CucumberJsonReportInterface;
  writeFile: () => void;
}

export interface Metadata {
  app: NameVersion;
  browser: Browser;
  date: Date;
  device: string;
  platform: Platform;
}
export interface Platform {
  name: PlatformName;
  version: string;
}

export interface NameVersion {
  name: string;
  version: string;
}

export interface Browser {
  name: BrowserName;
  version: string;
}

export type BrowserName =
  | 'internet explorer'
  | 'edge'
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'opera'
  | 'unknown';

export type PlatformName =
  | 'windows'
  | 'osx'
  | 'linux'
  | 'ubuntu'
  | 'android'
  | 'ios'
  | 'unknown';
