import { defaultOptions, ReporterOption } from './default-options';
import { fileExists, jsonFrom, writeJsonFileSync } from './fs';

export const defaultConfigurationFilePath = 'testcafe-reporter-cucumber-json.json';
const ensureConfigFileExists = (filepath: string) => {
  if (fileExists(filepath)) {
    return;
  }
  writeJsonFileSync(defaultOptions, defaultConfigurationFilePath);
};

ensureConfigFileExists(defaultConfigurationFilePath);
const defaultConfig = jsonFrom(defaultConfigurationFilePath) as ReporterOption;

export const options = defaultConfig;
