import { defaultOptions, IOption } from "./default-options";
import { fileExists, jsonFrom, writeJsonFileSync } from "./fs";

export const defaultConfigurationFilePath = "testcafe-reporter-cucumber-json.json";
const ensureConfigFileExists = (filepath: string) => {
    if (fileExists(filepath)) {
        return;
    }
    writeJsonFileSync(defaultOptions, defaultConfigurationFilePath);
};

ensureConfigFileExists(defaultConfigurationFilePath);
const defaultConfig = jsonFrom(defaultConfigurationFilePath) as IOption;

const defaultSeparators = [" ", "\n"];
defaultConfig.separators = defaultConfig.separators || [];
defaultConfig.separators.push(...defaultSeparators);

export const options = defaultConfig;
