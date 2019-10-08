# Cucumber JSON TestCafe Reporter

This is the **Cucumber JSON** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

[![npm badge](https://nodei.co/npm/testcafe-reporter-cucumber-json.png)](https://npmjs.org/package/testcafe-reporter-cucumber-json)

This TestCafe reporter generates a json file that can be converted to a nice and searchable html report by using [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

![report-sample](media/report01.png)

## To install this TestCafe Reporter

- run the command `npm install --save testcafe-reporter-cucumber-json`.

## Usage

- add to the testcafe command-line the following options:

```sh
testcafe chrome ./path-to-tests/*(.js|.testcafe|.ts) --reporter cucumber-json:reports/report.json --reporter-app-name='My App' --reporter-app-version='x.y.z'
```

## To generate the HTML report

- install [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter):

  > if you are using this reporter with version < 4.0.0
  >
  > > `npm install --save-dev multiple-cucumber-html-reporter@1.12.0`

  > if you are using this reporter with version >= 4.0.0
  >
  > > `npm install --save-dev multiple-cucumber-html-reporter` (>= v1.13.1)

- Create a `report-generator.js` file at the project root:

```javascript
const report = require('multiple-cucumber-html-reporter');
const path = require('path');
const projectName = path.basename(__dirname);
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = new Date().toISOString();
report.generate({
  reportName: 'TestCafe Report',
  jsonDir: 'reports',
  reportPath: 'reports',
  openReportInBrowser: true,
  disableLog: true,
  displayDuration: true,
  durationInMS: true,
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: `${projectName}` },
      { label: 'Release', value: `${projectVersion}` },
      { label: 'Report Generation Time', value: `${reportGenerationTime}` },
    ],
  },
});
```

- insert the following script in the `package.json` file:

```javascript
"report": "node report-generator.js",
```

- run the command `npm run report`

## Tagging

- Tags enables to filter the html report;
- Tags are generated dynamically from the:
  - fixture description
  - test description
  - fixture file name (TBD)
  - fixture folder hierarchy (TBD)
  - new t.meta() syntax (TBD)

## Tags managment

- Tags can be managed through the configuration file `testcafe-reporter-cucumber-json.json`
  - this json file will be created on the first reporter run
- To discard a tag, add this tag to the `noisyTags` section of the json configuration file.

## Error rendering

- this reporter will report multiple code frames, one for each file reported in the stacktrace

```text
1) The specified selector does not match any element in the DOM tree.

   Browser: Firefox 59.0.0 / Mac OS X 10.12.0
   Screenshot: /Users/HDO/VSCodeProjects/testcafe-starter/screenshots/2018-05-07_10-39-08/test-2/Firefox_59.0.0_Mac_OS_X_10.12.0/errors/1.png

      13 |
      14 |  const value = inputData.name || "";
      15 |
      16 |  await t
      17 |    .setTestSpeed(config.testcafe.testSpeed)
   --------------------------------------------
    → 18 |    .hover(selector.userNameInputBox)
   --------------------------------------------
      19 |    .expect(selector.userNameInputBox.hasAttribute("disabled")).notOk()
      20 |    .typeText(selector.userNameInputBox, value, {replace: true})
      21 |    .pressKey("tab");
      22 |};
      23 |

      at Object.(anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/domains/testcafe-sample-page/steps/i-enter-my-name.ts:18:6)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/domains/testcafe-sample-page/steps/i-enter-my-name.ts:7:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/domains/testcafe-sample-page/steps/i-enter-my-name.ts:3:12)
      at exports.default (/Users/HDO/VSCodeProjects/testcafe-starter/domains/testcafe-sample-page/steps/i-enter-my-name.ts:7:36)


       6 |  if (canExecute === false) {
       7 |    return;
       8 |  }
       9 |  const foundStep = stepMappings[stepName];
      10 |  if (typeof foundStep === "function" ) {
   --------------------------------------------
    → 11 |    await foundStep(stepName);
   --------------------------------------------
      12 |    return;
      13 |  }
      14 |  throw new Error(`Step "${stepName}" is not mapped to an executable code.`);
      15 |}
      16 |export async function given(stepName: GivenStep) {

      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:11:11)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:7:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:3:12)
      at executeStep (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:14:12)
      at Object.(anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:20:9)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:7:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:3:12)
      at Object.when (/Users/HDO/VSCodeProjects/testcafe-starter/step-runner.ts:34:12)


      19 |  await  then("no name should be populated");
      20 |  await   and("I cannot submit my feedback on testcafe");
      21 |});
      22 |
      23 |test("Scenario: can send feedback with my name only", async () =) {
   --------------------------------------------
    → 24 |  await  when("I enter my name");
   --------------------------------------------
      25 |  await  then("I can submit my feedback on testcafe");
      26 |});
      27 |
      28 |test("Scenario: send feedback", async () =) {
      29 |  await env.only( "devci");

      at Object.(anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/features/testcafe-sample-page.spec.ts:24:10)
      at (anonymous) (/Users/HDO/VSCodeProjects/testcafe-starter/features/testcafe-sample-page.spec.ts:7:71)
      at __awaiter (/Users/HDO/VSCodeProjects/testcafe-starter/features/testcafe-sample-page.spec.ts:3:12)
      at test (/Users/HDO/VSCodeProjects/testcafe-starter/features/testcafe-sample-page.spec.ts:23:66)

```

## Screenshot rendering

- this reporter embeds all screenshots as base 64 images, making the generated json file completely autonomous.

## Contributors

- [Tareq El-Masri](https://github.com/TareqElMasri)
- [Tom Ardern](https://github.com/tomardern)
- [Henri d'Orgeval](https://github.com/hdorgeval)
