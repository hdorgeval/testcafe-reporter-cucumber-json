# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [6.3.0] - 2021-07-21

### Added

- feat(reporter): be able to set reporter options through environment variables.

  - you can now set the `--reporter-json-folder`, `--reporter-app-name` and `--reporter-app-version` options as variable environments:

  ```js
  process.env['--reporter-json-folder'] = 'my-custom-folder';
  process.env['--reporter-app-name'] = 'My App';
  process.env['--reporter-app-version'] = 'x.y.z';
  // then start tests via the TestCafé Runner
  ```

## [6.2.1] - 2021-01-30

### Fixed

- fix(screenshot): don't crash when file not found ([#31](https://github.com/hdorgeval/testcafe-reporter-cucumber-json/pull/31))

## [6.2.0] - 2020-09-05

### Added

- feat(reporter): be able to set cli options through configuration file

  - you can now use the `testcafe-reporter-cucumber-json.json` configuration file to set the `--reporter-json-folder`, `--reporter-app-name` and `--reporter-app-version` cli options: add or edit the `args` section in the json configuration file:

  ```json
  "args": {
    "appName": false,
    "appVersion": false,
    "reportFolder": "my-custom-folder"
  }
  ```

  Every property in `args` is optional. If you just want to only setup a custom folder:

  ```json
  "args": {
    "reportFolder": "my-custom-folder"
  }
  ```

  Note: The command-line options will take precedence over the configuration file.

## [6.1.1] - 2020-08-06

### Fixed

- fix(browserstack): filter errors by testRunId instead of browser name

## [6.1.0] - 2020-07-23

### Added

- feat(reporter): be able to display the date and time of tests execution in the final HTML report.
  ![report-overview](media/report04.png)

  To enable this feature you must add `displayReportTime: true` to the `options` object passed to the HTML generator.

### Fixed

- update dependencies

## [6.0.10] - 2020-07-19

### Fixed

- fix(reporter): report desktop devices from browserstack

## [6.0.9] - 2020-07-19

### Fixed

- fix(reporter): process cli options only when defined

## [6.0.8] - 2020-07-19

### Fixed

- fix(reporter): report devices from browserstack

## [6.0.7] - 2020-07-16

### Fixed

- fix(user-agent): fix user-agent parsing for Internet Explorer

## [6.0.6] - 2020-07-16

### Fixed

- fix(reporter): report device on browserstack
- fix(reporter): remove browserstack url from JSON filenames
- fix vulnerabilities

## [6.0.5] - 2020-07-15

### Fixed

- fix(reporter): handle userAgent on browserstack
- fix(user-agent): fix user-agent parsing for iOS
- fix(user-agent): fix user-agent parsing for Android

## [6.0.4] - 2020-07-14

### Fixed

- fix(reporter): handle screenshots when there is no error

## [6.0.3] - 2020-07-11

### Fixed

- fix(reporter): handle multi-browser reporting

## [6.0.2] - 2020-07-08

### Fixed

- fix(reporter): push an empty report to the TestCafe plugin host

## [6.0.1] - 2020-07-06

### Fixed

- fix(reporter): remove chalk formatting

## [6.0.0] - 2020-07-05

### BREAKING CHANGES

- Declaration of this reporter, on the TestCafe CLI has changed:

```sh
testcafe chrome ./path-to-tests/*(.js|.testcafe|.ts) --reporter cucumber-json --reporter-app-name='My App' --reporter-app-version='x.y.z'
```

or if you use the `runner.reporter`

```js
runner.reporter('cucumber-json');
```

> You do not need to specify a filename in the reporter declaration, because the reporter now creates itself all json files.
>
> JSON files are now automatically created in a folder named `cucumber-json-reports` at the root of your project.
>
> JSON files are created for each browser and for each test execution, for example:

```sh
  cucumber-json-reports
  |- Chrome_83_0_4103_116_macOS_10_15_5-2020-07-04T19-44-58-493Z.json
  |- Firefox_78_0_macOS_10_15-2020-07-04T19-44-58-493Z.json
  |- Microsoft_Edge_83_0_478_58_macOS_10_15_5-2020-07-04T19-38-05-688Z.json
  |- Microsoft_Edge_83_0_478_58_macOS_10_15_5-2020-07-04T19-44-58-493Z.json
  |- Safari_13_1_1_macOS_10_15_5-2020-07-04T19-44-58-493Z.json
  |- ...
```

> If you need to change this folder, add this option on the TestCafé command-line:

```sh
--reporter-json-folder='my-custom-folder'
```

> You should update the `report-generator.ts` file:

```js
report.generate({
  jsonDir: 'cucumber-json-reports',
  reportPath: 'cucumber-json-reports/html',
});
```

### Added

- [be able to have a json report file per browser and per execution](https://github.com/hdorgeval/testcafe-reporter-cucumber-json/issues/7)

### Fixed

- Fix user-agent parsing for Edge
- Update dependencies

## [5.1.0] - 2020-04-15

### Added

- Linux platform support by [NathanYocum](https://github.com/NathanYocum)

## [5.0.0] - 2020-03-25

A major version has been published only because prod dependencies have been updated to their latest version.

### Fix

- Fix user-agent parsing for windows 10 [issue #20](https://github.com/hdorgeval/testcafe-reporter-cucumber-json/issues/20)
- Update dependencies

## [4.0.1] - 2020-03-19

### Fix

- Merge pull request #19 from guiyomh/hotfix/user-agent-osx

  - Fix user-agent parsing for macOS

- chore(vulnerability): update minimist dependency

## [4.0.0] - 2019-10-08

### Changed

**This version must be used together with multiple-cucumber-html-reporter >= 1.13.1**

- update dependencies
- fix vulnerabilities
- fix issue [#13](https://github.com/hdorgeval/testcafe-reporter-cucumber-json/issues/13)

## [3.0.1] - 2019-08-29

### Fix

- warn only when the reporter receives a non TestCafe error.

## [3.0.0] - 2019-08-27

### Added

- be able to handle reporting of .testcafe files execution (files generated by TestCafe Studio) ([issue 10](https://github.com/hdorgeval/testcafe-reporter-cucumber-json/issues/10)).

## [2.0.1] - 2019-08-26

### Fix

- warn when TestCafe sends to the reporter an error with an unexpected structure.

## [2.0.0] - 2019-08-09

### Fixed

There are potentially breaking changes, because of breaking changes in dependencies updates.

- update all dependencies
- remove vulnerabilities
- fix browserstack platform [issue](https://github.com/hdorgeval/testcafe-reporter-cucumber-json/issues/8)

## [1.2.0] - 2019-03-24

### Added

- add tags from test description

## [1.1.1] - 2019-03-23

### Fixed

- remove 'Feature'/'Scenario' prefix in fixture/test description

## [1.1.0] - 2019-03-23

### Added

- embed screenshots as base64 images

## [1.0.1] - 2019-03-10

### Fixed

- mark scenario as skipped when step is skipped

## [1.0.0] - 2019-03-10

### Changed

- Support report with screenshots by including screenshots to report.json ([Tareq El-Masri](https://github.com/TareqElMasri))
- Update all dependencies
- Update documentation
- Remove TestCafe dependency and set it as peer dependency
