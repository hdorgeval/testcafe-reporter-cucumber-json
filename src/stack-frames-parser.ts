import { CallsiteInterface, StackFrame } from './reporter-interface';

export const filterStackFramesIn = (callsite: CallsiteInterface) => {
  if (callsite) {
    ensureCallsiteAndStackFramesAreValid(callsite);
    const filteredStackFrames = getCurrentAppStackFramesFrom(callsite);
    callsite.stackFrames = filteredStackFrames;
    callsite.callsiteFrameIdx = 0;
  }
};

function ensureCallsiteAndStackFramesAreValid(callsite: CallsiteInterface) {
  if (!Array.isArray(callsite.stackFrames)) {
    // tslint:disable-next-line:no-console
    console.warn(
      `testcafe-reporter-cucumber-json: cannot render errors because the callsite object has unexpected content`,
    );
    // tslint:disable-next-line:no-console
    console.warn(
      `testcafe-reporter-cucumber-json: please provide the following log to github.com/hdorgeval/testcafe-reporter-cucumber-json :`,
    );
    // tslint:disable-next-line:no-console
    console.warn(`testcafe-reporter-cucumber-json :`, {
      callsite,
      stackFrames: callsite.stackFrames,
    });
  }
}

export const getCurrentAppStackFramesFrom = (
  callsite: CallsiteInterface,
): StackFrame[] => {
  const result: StackFrame[] = [];
  if (callsite && Array.isArray(callsite.stackFrames)) {
    callsite.stackFrames.map((stackFrame: StackFrame) => {
      const filename = getFileNameFrom(stackFrame);
      if (isNodeModuleOrIsNullOrUndefined(filename)) {
        return;
      }
      result.push(stackFrame);
    });
  }
  return result;
};
export const getFileNameFrom = (stackFrame: StackFrame): string | null | undefined => {
  if (
    stackFrame &&
    stackFrame.getFileName &&
    typeof stackFrame.getFileName === 'function'
  ) {
    return stackFrame.getFileName();
  }
  return undefined;
};
export const isNodeModuleOrIsNullOrUndefined = (
  filePath: string | undefined | null,
): boolean => {
  if (filePath === undefined || filePath === null) {
    return true;
  }

  if (filePath.includes('node_modules')) {
    return true;
  }
  return false;
};
export const getAllFilesIn = (callsite: CallsiteInterface): string[] => {
  let currentFile: string = 'undefined';
  const result = callsite.stackFrames
    .map((stackFrame: StackFrame) => stackFrame.getFileName())
    .filter((filepath: string | undefined | null) => {
      if (filepath === undefined || filepath === null) {
        return false;
      }
      if (filepath === currentFile) {
        return false;
      }
      currentFile = filepath;
      return true;
    });
  return result;
};
export const stackFramesOf = (filename: string) => {
  return {
    in: (stackFrames: StackFrame[]): StackFrame[] => {
      const result = stackFrames.filter(
        (stackFrame) => filename === getFileNameFrom(stackFrame),
      );
      return result;
    },
  };
};
