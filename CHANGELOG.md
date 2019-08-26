# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
