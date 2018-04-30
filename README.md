# Cucumber JSON TestCafe Reporter (beta)

This is the **Cucumber JSON** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

[![npm badge](https://nodei.co/npm/testcafe-reporter-cucumber-json.png)](https://npmjs.org/package/testcafe-reporter-cucumber-json)


## To install this TestCafe Reporter

* run the command `npm install --save testcafe-reporter-cucumber-json`.

## Usage

* add to the testcafe command-line the following options:
```sh
--reporter cucumber-json:reports/report.json --reporter-app-name='My App' --reporter-app-version='x.y.z'
```

## To generate the HTML report

* install [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter):
    * `npm install --save-dev multiple-cucumber-html-reporter`

* Create a `report-generator.js` file at the project root:

```javascript
const report = require('multiple-cucumber-html-reporter');
const path = require('path');
const projectName = path.basename(__dirname);
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = (new Date()).toISOString();
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
            {label: 'Project', value: `${projectName}`},
            {label: 'Release', value: `${projectVersion}`},
            {label: 'Report Generation Time', value: `${reportGenerationTime}`},
            
        ]
    }
});
```

* insert the following script in the `package.json` file:
```javascript
"report": "node report-generator.js",
```

* run the command `npm run report`