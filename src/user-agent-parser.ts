import { Browser, BrowserName, NameVersion, Platform } from './cucumber-json-interfaces';
import * as semver from 'semver';

const unknownPlatform: Platform = {
  name: 'unknown',
  version: 'unknown',
};

const unknownBrowser: Browser = {
  name: 'unknown',
  version: 'unknown',
};

/**
 *
 * @param userAgent - user agent given back by TestCafe.
 * This string is in the form : '<browser> x.y.z / <platform> a.b.c'.
 * For example: Firefox 59.0.0 / Mac OS X 10.12.0'
 */
export function getPlatformFrom(userAgent: string | undefined): Platform {
  if (userAgent === undefined) {
    return {
      ...unknownPlatform,
    };
  }
  const sanitizedUserAgent = userAgent.replace(/\(https:.*\)/gi, '');
  const parts = sanitizedUserAgent.split('/');
  if (parts.length <= 1) {
    // eslint-disable-next-line no-console
    console.warn(
      `testcafe-reporter-cucumber-json: cannot get the Platform name from input string '${userAgent}'`,
    );
    return {
      ...unknownPlatform,
    };
  }
  const rawPlatorm = parts.pop();
  if (rawPlatorm === undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      `testcafe-reporter-cucumber-json: cannot get the Platform name from input string '${userAgent}'`,
    );
    return {
      ...unknownPlatform,
    };
  }
  const platformInfo = extractNameAndVersion(rawPlatorm);
  if (isMacOsX(platformInfo.name)) {
    return {
      name: 'osx',
      version: platformInfo.version,
    };
  }
  if (isLinux(platformInfo.name)) {
    return {
      name: 'linux',
      version: platformInfo.version,
    };
  }
  if (isWindows(platformInfo.name)) {
    return {
      name: 'windows',
      version: platformInfo.version,
    };
  }
  // eslint-disable-next-line no-console
  console.warn(
    `testcafe-reporter-cucumber-json: cannot get the Platform name from input string '${userAgent}'`,
  );
  return {
    ...unknownPlatform,
  };
}

/**
 *
 * @param userAgent - user agent given back by TestCafe.
 * This string is in the form : '<browser> x.y.z / <platform> a.b.c'.
 * For example: Firefox 59.0.0 / Mac OS X 10.12.0'
 */
export function getDeviceFrom(userAgent: string | undefined): string {
  if (userAgent === undefined) {
    return 'undefined';
  }
  const parts = userAgent.split('/');
  if (parts.length <= 1) {
    return 'undefined';
  }
  const rawPlatorm = parts.pop();
  if (rawPlatorm === undefined) {
    return 'undefined';
  }
  const platformInfo = extractNameAndVersion(rawPlatorm);
  return platformInfo.name;
}

export function isMacOsX(platformName: string | undefined): boolean {
  if (platformName === undefined) {
    return false;
  }
  const result =
    platformName.toLowerCase().includes('mac') &&
    platformName.toLowerCase().includes('os');
  return result;
}

export function isLinux(platformName: string | undefined): boolean {
  if (platformName === undefined) {
    return false;
  }
  const result = platformName.toLowerCase().includes('linux');
  return result;
}

export function isWindows(platformName: string | undefined): boolean {
  if (platformName === undefined) {
    return false;
  }
  const result = platformName.toLowerCase().includes('windows');
  return result;
}

function isValidVersion(version: string): boolean {
  if (semver.valid(version) !== null) {
    return true;
  }

  if (version.includes('.')) {
    return true;
  }

  if (isNaN(Number(version))) {
    return false;
  }

  return true;
}

export function extractNameAndVersion(input: string | undefined | null): NameVersion {
  if (input === undefined || input === null) {
    return {
      name: 'unknown',
      version: 'unknown',
    };
  }
  const version =
    input
      .trim()
      .split(' ')
      .filter((item) => isValidVersion(item))
      .pop() || 'unknown';

  const name = input.replace(version, '').trim();
  return {
    name,
    version,
  };
}

/**
 *
 * @param userAgent - user agent given back by TestCafe.
 * This string is in the form : '<browser> x.y.z / <platform> a.b.c'.
 * For example: Firefox 59.0.0 / Mac OS X 10.12.0'
 */
export function getBrowserFrom(userAgent: string | undefined): Browser {
  if (userAgent === undefined) {
    return {
      ...unknownBrowser,
    };
  }

  const parts = userAgent.split('/');
  if (parts.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `testcafe-reporter-cucumber-json: cannot get the Browser name from input string '${userAgent}'`,
    );
    return {
      ...unknownBrowser,
    };
  }
  const rawBrowser = parts[0];
  if (rawBrowser === undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      `testcafe-reporter-cucumber-json: cannot get the Browser name from input string '${userAgent}'`,
    );
    return {
      ...unknownBrowser,
    };
  }

  const browserInfo = extractNameAndVersion(rawBrowser);
  const browserName: BrowserName = browserNameMapping[browserInfo.name]
    ? browserNameMapping[browserInfo.name]
    : 'unknown';
  return {
    name: browserName,
    version: browserInfo.version,
  };
}

export const browserNameMapping: { [index: string]: BrowserName } = {
  'Microsoft Edge': 'edge',
  Chrome: 'chrome',
  Edge: 'edge',
  Firefox: 'firefox',
  HeadlessChrome: 'chrome',
  IE: 'internet explorer',
  Opera: 'opera',
  Safari: 'safari',
};
