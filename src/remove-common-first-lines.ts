export function removeCommonFirstLines(reference: string, content: string): string {
  const linesInContent = content.split('\n');

  let commonFirstLines = '';
  for (let index = 0; index < linesInContent.length; index++) {
    const nextCommonPart =
      index === 0
        ? `${commonFirstLines}${linesInContent[index]}`
        : `${commonFirstLines}\n${linesInContent[index]}`;

    if (reference.includes(nextCommonPart)) {
      commonFirstLines = nextCommonPart;
      continue;
    }

    if (index > 2) {
      return content.replace(commonFirstLines, '');
    }

    return content;
  }

  return content.replace(commonFirstLines, '');
}
