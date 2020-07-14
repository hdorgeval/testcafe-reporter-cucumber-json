import { CucumberJsonReportInterface } from './cucumber-json-interfaces';
import { CallsiteRecord } from 'callsite-record';
import { Chalk } from 'chalk';
export interface Reporter {
  reportTaskStart: (startTime: Date, userAgents: string[], testCount: number) => void;
  reportFixtureStart: (name: string, path: string) => void;
  reportTestDone: (name: string, testRunInfo: TestRunInfo) => void;
  reportTaskDone: (endTime: Date, passed: number, warnings: string[]) => void;
  renderErrors: (errs: CallsiteError[]) => string;
  createErrorDecorator: () => unknown;
}

export interface ExtendedReporter {
  reportTaskStart: (
    startTime: Date,
    userAgents: string[],
    testCount: number,
    report: CucumberJsonReportInterface,
  ) => void;
  reportFixtureStart: (
    name: string,
    path: string,
    report: CucumberJsonReportInterface,
  ) => void;
  reportTestDone: (
    name: string,
    testRunInfo: TestRunInfo,
    report: CucumberJsonReportInterface,
  ) => void;
  reportTaskDone: (
    endTime: Date,
    passed: number,
    warnings: string[],
    report: CucumberJsonReportInterface,
  ) => void;
}

export interface ReporterPlugin extends Reporter, ReporterlPluginHost {}

export interface ExtendedReporterPlugin extends ExtendedReporter, ReporterlPluginHost {
  renderErrors: (errs: CallsiteError[]) => string;
  createErrorDecorator: () => unknown;
}

export interface TestRunInfo {
  browsers: BrowserInfo[];
  durationMs: number;
  errs: CallsiteError[];
  screenshotPath: string | null;
  screenshots: Screenshot[];
  skipped: boolean;
  videos: unknown[];
  warnings: string[];
}

export interface BrowserInfo {
  alias: string;
  engine: unknown;
  headless: boolean;
  name: string;
  os: unknown;
  platform: string;
  prettyUserAgent: string;
  testRunId: string;
  userAgent: string;
  version: string;
}

export interface Screenshot {
  screenshotPath: string;
  thumbnailPath: string;
  userAgent: string;
  quarantineAttempt: number | null;
  takenOnFail: boolean;
  testRunId: string;
}

export interface CallsiteError {
  callsite: CallsiteInterface;
  code: string;
  errMsg: string;
  isTestCafeError: boolean;
  originError: string;
  screenshotPath: string;
  testRunId: string;
  testRunPhase: string;
  type: TestCafeErrorType;
  userAgent: string;
}

export interface CallsiteInterface extends CallsiteRecord {
  filename: string;
  lineNum: number;
  stackFrames: StackFrame[];
  callsiteFrameIdx: number;
  isV8Frames: boolean;
}

export interface StackFrame {
  getFileName: () => string;
  getLineNumber: () => number;
  getColumnNumber: () => number;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  source: string;
  functionName?: string;
}
export interface CallsiteRendererOption {
  codeFrame: boolean;
  frameSize: number;
  stack: boolean;
}

export type TestCafeErrorType =
  | 'actionAdditionalElementIsInvisibleError'
  | 'actionAdditionalElementNotFoundError'
  | 'actionAdditionalSelectorMatchesWrongNodeTypeError'
  | 'actionBooleanOptionError'
  | 'actionCanNotFindFileToUploadError'
  | 'actionElementIsInvisibleError'
  | 'actionElementIsNotFileInputError'
  | 'actionElementNonContentEditableError'
  | 'actionElementNonEditableError'
  | 'actionElementNotFoundError'
  | 'actionElementNotFoundError'
  | 'actionElementNotIframeError'
  | 'actionElementNotTextAreaError'
  | 'actionIframeIsNotLoadedError'
  | 'actionIncorrectKeysError'
  | 'actionIntegerArgumentError'
  | 'actionIntegerOptionError'
  | 'actionInvalidScrollTargetError'
  | 'actionNullableStringArgumentError'
  | 'actionOptionsTypeError'
  | 'actionPositiveIntegerArgumentError'
  | 'actionPositiveIntegerOptionError'
  | 'actionRoleArgumentError'
  | 'actionRootContainerNotFoundError'
  | 'actionSelectorError'
  | 'actionSelectorMatchesWrongNodeTypeError'
  | 'actionSpeedOptionError'
  | 'actionStringArgumentError'
  | 'actionStringArrayElementError'
  | 'actionStringOrStringArrayArgumentError'
  | 'actionUnsupportedDeviceTypeError'
  | 'assertionExecutableArgumentError'
  | 'cantObtainInfoForElementSpecifiedBySelectorError'
  | 'clientFunctionExecutionInterruptionError'
  | 'currentIframeIsInvisibleError'
  | 'currentIframeIsNotLoadedError'
  | 'currentIframeNotFoundError'
  | 'domNodeClientFunctionResultError'
  | 'externalAssertionLibraryError'
  | 'invalidElementScreenshotDimensionsError'
  | 'invalidSelectorResultError'
  | 'missingAwaitError'
  | 'nativeDialogNotHandledError'
  | 'pageLoadError'
  | 'roleSwitchInRoleInitializerError'
  | 'setNativeDialogHandlerCodeWrongTypeError'
  | 'setTestSpeedArgumentError'
  | 'uncaughtErrorInClientFunctionCode'
  | 'uncaughtErrorInCustomDOMPropertyCode'
  | 'uncaughtErrorInNativeDialogHandler'
  | 'uncaughtErrorInTestCode'
  | 'uncaughtErrorOnPage'
  | 'uncaughtNonErrorObjectInTestCode'
  | 'windowDimensionsOverflowError';

export interface ReporterlPluginHost {
  write: (text: string) => ReporterlPluginHost;
  setIndent: (val: number) => ReporterlPluginHost;
  newline: () => ReporterlPluginHost;
  chalk: Chalk;
  formatError: (err: CallsiteError, prefix: string) => string;
}
