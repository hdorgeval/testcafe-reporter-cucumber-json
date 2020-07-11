import * as SUT from './remove-common-first-lines';
test('It should remove when there is at least 3 common lines', () => {
  // Given
  const reference = `A
  B
  C
  Z
  `;

  const content = `A
  B
  C
  D
  E
  `;

  // When
  const result = SUT.removeCommonFirstLines(reference, content);

  // Then
  const expected = `
  D
  E
  `;
  expect(result).toBe(expected);
});

test('It should not remove when there is less than least 3 common lines', () => {
  // Given
  const reference = `A
  B
  Z
  `;

  const content = `A
  B
  C
  D
  E
  `;

  // When
  const result = SUT.removeCommonFirstLines(reference, content);

  // Then
  expect(result).toBe(content);
});

test('It should remove - use case 2', () => {
  // Given
  const reference = `
  Z
  A
  B
  C
  `;

  const content = `
  A
  B
  D
  `;

  // When
  const result = SUT.removeCommonFirstLines(reference, content);

  // Then
  const expected = `
  D
  `;
  expect(result).toBe(expected);
});

test('It should remove - real world', () => {
  // Given
  const reference = `1) - Error in fixture.beforeEach hook -
   A request to "https://devexpress.github.io/testcafe/example" has failed.
   Use quarantine mode to perform additional attempts to execute this test.
   You can find troubleshooting information for this issue at "https://go.devexpress.com/TestCafe_FAQ_ARequestHasFailed.aspx".

   Error details:
   Failed to find a DNS-record for the resource at "https://devexpress.github.io/testcafe/example".

   Browser: Firefox 78.0 / macOS 10.15
   Screenshot: /Users/HDO/VSCodeProjects/testcafe-starter/screenshots/2020-07-10_20-15-54/test-3/Firefox_78.0_macOS_10.15/errors/1.png

      11 |   const config: Config = getCurrentConfig(t);
      12 | 
      13 |   // eslint-disable-next-line @typescript-eslint/no-use-before-define
      14 |   ensureEnvIsSetupInConfigurationFile(config);
      15 |   if (config && config.env) {
   --------------------------------------------
    → 16 |     await t.navigateTo(config.env.url);
   --------------------------------------------
      17 |   }
      18 | };
      19 | 
      20 | function ensureEnvIsSetupInConfigurationFile(config: Config): void {
      21 |   if (config && config.env && config.env.url) {

      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/steps/i-navigate-to-the-testcafe-sample-page.ts:16:13)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/steps/i-navigate-to-the-testcafe-sample-page.ts:8:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/steps/i-navigate-to-the-testcafe-sample-page.ts:4:12)
      at exports.default (/Users/HDO/VSCodeProjects/testcafe-starter/steps/i-navigate-to-the-testcafe-sample-page.ts:9:42)
`;

  const content = `A request to "https://devexpress.github.io/testcafe/example" has failed.
   Use quarantine mode to perform additional attempts to execute this test.
   You can find troubleshooting information for this issue at "https://go.devexpress.com/TestCafe_FAQ_ARequestHasFailed.aspx".

   Error details:
   Failed to find a DNS-record for the resource at "https://devexpress.github.io/testcafe/example".

   Browser: Firefox 78.0 / macOS 10.15
   Screenshot: /Users/HDO/VSCodeProjects/testcafe-starter/screenshots/2020-07-10_20-15-54/test-3/Firefox_78.0_macOS_10.15/errors/1.png

      47 |     return;
      48 |   }
      49 | 
      50 |   const foundStep = stepMappings[stepName];
      51 |   if (typeof foundStep === 'function') {
   --------------------------------------------
    → 52 |     await foundStep(stepName as string);
   --------------------------------------------
      53 |     showSuccess(stepName, stepLabel);
      54 |     return;
      55 |   }
      56 | 
      57 |   throw new Error('Step stepName is not mapped to an executable code.');

      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:52:11)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:8:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:4:12)
      at executeStep (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:38:12)
      at Object.(anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:60:9)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:8:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:4:12)
      at Object.given (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:52:12)
`;

  // When
  const result = SUT.removeCommonFirstLines(reference, content);

  // Then
  const expected = `
      47 |     return;
      48 |   }
      49 | 
      50 |   const foundStep = stepMappings[stepName];
      51 |   if (typeof foundStep === 'function') {
   --------------------------------------------
    → 52 |     await foundStep(stepName as string);
   --------------------------------------------
      53 |     showSuccess(stepName, stepLabel);
      54 |     return;
      55 |   }
      56 | 
      57 |   throw new Error('Step stepName is not mapped to an executable code.');

      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:52:11)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:8:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:4:12)
      at executeStep (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:38:12)
      at Object.(anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:60:9)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:8:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:4:12)
      at Object.given (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:52:12)
`;
  expect(result).toBe(expected);
});

test('It should remove - real world - use case 2', () => {
  // Given
  const reference =
    '1) - Error in fixture.beforeEach hook -\n   A request to "http://devexpress.github.io/testcafe/example" has failed.\n   Use quarantine mode to perform additional attempts to execute this test.\n   You can find troubleshooting information for this issue at "https://go.devexpress.com/TestCafe_FAQ_ARequestHasFailed.aspx".\n\n   Error details:\n   Failed to find a DNS-record for the resource at "http://devexpress.github.io/testcafe/example".\n\n   Browser: Chrome 83.0.4103.116 / macOS 10.15.5\n\n      11 |   const config: Config = getCurrentConfig(t);\n      12 | \n      13 |   // eslint-disable-next-line @typescript-eslint/no-use-before-define\n      14 |   ensureEnvIsSetupInConfigurationFile(config);\n      15 |   if (config && config.env) {\n   --------------------------------------------\n    &rarr; 16 |     await t.navigateTo(config.env.url);\n   --------------------------------------------\n      17 |   }\n      18 | };\n      19 | \n      20 | function ensureEnvIsSetupInConfigurationFile(config: Config): void {\n      21 |   if (config && config.env && config.env.url) {\n\n      at <anonymous> (/Users/HDO/VSCodeProjects/testcafe-starter/steps/i-navigate-to-the-testcafe-sample-page.ts:16:13)\n      at <anonymous> (/Users/HDO/VSCodeProjects/testcafe-starter/steps/i-navigate-to-the-testcafe-sample-page.ts:8:71)\n';

  const content =
    '1) - Error in fixture.beforeEach hook -\n   A request to "http://devexpress.github.io/testcafe/example" has failed.\n   Use quarantine mode to perform additional attempts to execute this test.\n   You can find troubleshooting information for this issue at "https://go.devexpress.com/TestCafe_FAQ_ARequestHasFailed.aspx".\n\n   Error details:\n   Failed to find a DNS-record for the resource at "http://devexpress.github.io/testcafe/example".\n\n   Browser: Chrome 83.0.4103.116 / macOS 10.15.5';

  // When
  const result = SUT.removeCommonFirstLines(reference, content);

  // Then
  const expected = '';
  expect(result).toBe(expected);
});
