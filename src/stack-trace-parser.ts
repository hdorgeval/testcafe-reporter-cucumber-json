export const getStackTraceHeaderFrom = (stackTrace: string): string => {
  const stackTracelines = stackTrace.split('\n');
  if (stackTracelines.length <= 5) {
    return stackTracelines[0];
  }
  let lastIndex = 0;
  const result = [];
  for (let index = 0; index < 5; index++) {
    const line = stackTracelines[index];
    if (line && line.includes('Browser: ')) {
      lastIndex = index;
      continue;
    }
    if (line && line.includes('Screenshot: ')) {
      lastIndex = index;
      continue;
    }
  }

  for (let index = 0; index <= lastIndex; index++) {
    result.push(stackTracelines[index]);
  }

  return result.join('\n');
};
