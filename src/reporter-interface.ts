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
  durationMs: number;
  screenshotPath: string;
  skipped: boolean;
  errs: CallsiteError[];
  screenshots: Screenshot[];
}

export interface Screenshot {
  screenshotPath: string;
  thumbnailPath: string;
  userAgent: string;
  quarantineAttempt: number | null;
  takenOnFail: boolean;
}

export interface CallsiteError {
  callsite: CallsiteInterface;
  isTestCafeError: boolean;
  screenshotPath: string;
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
}
export interface CallsiteRendererOption {
  codeFrame: boolean;
  frameSize: number;
  stack: boolean;
}

export type TestCafeErrorType =
  | 'actionElementNotFoundError'
  | 'uncaughtErrorOnPage'
  | 'uncaughtErrorInTestCode'
  | 'uncaughtNonErrorObjectInTestCode'
  | 'uncaughtErrorInClientFunctionCode'
  | 'uncaughtErrorInCustomDOMPropertyCode'
  | 'missingAwaitError'
  | 'actionIntegerOptionError'
  | 'actionPositiveIntegerOptionError'
  | 'actionBooleanOptionError'
  | 'actionSpeedOptionError'
  | 'actionOptionsTypeError'
  | 'actionStringArgumentError'
  | 'actionNullableStringArgumentError'
  | 'actionStringOrStringArrayArgumentError'
  | 'actionStringArrayElementError'
  | 'actionIntegerArgumentError'
  | 'actionRoleArgumentError'
  | 'actionPositiveIntegerArgumentError'
  | 'actionSelectorError'
  | 'actionElementNotFoundError'
  | 'actionElementIsInvisibleError'
  | 'actionSelectorMatchesWrongNodeTypeError'
  | 'actionAdditionalElementNotFoundError'
  | 'actionAdditionalElementIsInvisibleError'
  | 'actionAdditionalSelectorMatchesWrongNodeTypeError'
  | 'actionElementNonEditableError'
  | 'actionElementNotTextAreaError'
  | 'actionElementNonContentEditableError'
  | 'actionElementIsNotFileInputError'
  | 'actionRootContainerNotFoundError'
  | 'actionIncorrectKeysError'
  | 'actionCanNotFindFileToUploadError'
  | 'actionUnsupportedDeviceTypeError'
  | 'actionIframeIsNotLoadedError'
  | 'actionElementNotIframeError'
  | 'actionInvalidScrollTargetError'
  | 'currentIframeIsNotLoadedError'
  | 'currentIframeNotFoundError'
  | 'currentIframeIsInvisibleError'
  | 'nativeDialogNotHandledError'
  | 'uncaughtErrorInNativeDialogHandler'
  | 'setTestSpeedArgumentError'
  | 'setNativeDialogHandlerCodeWrongTypeError'
  | 'clientFunctionExecutionInterruptionError'
  | 'domNodeClientFunctionResultError'
  | 'invalidSelectorResultError'
  | 'cantObtainInfoForElementSpecifiedBySelectorError'
  | 'externalAssertionLibraryError'
  | 'pageLoadError'
  | 'windowDimensionsOverflowError'
  | 'invalidElementScreenshotDimensionsError'
  | 'roleSwitchInRoleInitializerError'
  | 'assertionExecutableArgumentError';

export interface ReporterlPluginHost {
  write: (text: string) => ReporterlPluginHost;
  setIndent: (val: number) => ReporterlPluginHost;
  newline: () => ReporterlPluginHost;
  chalk: Chalk;
  formatError: (err: CallsiteError, prefix: string) => string;
}
