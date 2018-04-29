import * as semver from "semver";
import { IBrowser, INameVersion, IPlatform } from "./cucumber-json-interface";

const unknownPlatform: IPlatform = {
    name: "unknown",
    version: "unknown",
};

const unknownBrowser: IBrowser = {
    name: "unknown",
    version: "unknown",
};

export function getPlatformFrom(userAgent: string | undefined): IPlatform {
    if (userAgent === undefined) {
        return {
            ...unknownPlatform,
        };
    }

    const parts = userAgent.split("/");
    if (parts.length <= 1) {
        // tslint:disable-next-line:no-console
        console.warn(`testcafe-reporter-cucumber-json: cannot get the Platform name from input string '${userAgent}'`);
        return {
            ...unknownPlatform,
        };
    }
    const rawPlatorm = parts.pop();
    if (rawPlatorm === undefined) {
        // tslint:disable-next-line:no-console
        console.warn(`testcafe-reporter-cucumber-json: cannot get the Platform name from input string '${userAgent}'`);
        return {
            ...unknownPlatform,
        };
    }
    const platformInfo = extractNameAndVersion(rawPlatorm);
    if (isMacOsX(platformInfo.name)) {
        return {
            name: "osx",
            version: platformInfo.version,
        };
    }
    if (isWindows(platformInfo.name)) {
        return {
            name: "windows",
            version: platformInfo.version,
        };
    }
    // tslint:disable-next-line:no-console
    console.warn(`testcafe-reporter-cucumber-json: cannot get the Platform name from input string '${userAgent}'`);
    return {
        ...unknownPlatform,
    };
}

export function getDeviceFrom(userAgent: string | undefined): string {
    if (userAgent === undefined) {
        return "undefined";
    }
    const parts = userAgent.split("/");
    if (parts.length <= 1) {
        return "undefined";
    }
    const rawPlatorm = parts.pop();
    if (rawPlatorm === undefined) {
        return "undefined";
    }
    const platformInfo = extractNameAndVersion(rawPlatorm);
    return platformInfo.name;
}

export function isMacOsX(platformName: string | undefined): boolean {
    if (platformName ===  undefined) {
        return false;
    }
    const result = platformName.toLowerCase().includes("mac")
                && platformName.toLowerCase().includes("os")
                && platformName.toLowerCase().includes("x");
    return result;
}

export function isWindows(platformName: string | undefined): boolean {
    if (platformName ===  undefined) {
        return false;
    }
    const result = platformName.toLowerCase().includes("windows");
    return result;
}

export function extractNameAndVersion(input: string | undefined | null): INameVersion {
    if (input === undefined || input === null) {
        return {
            name: "unknown",
            version: "unknown",
        };
    }
    const version = input
        .split(" ")
        .filter((item) => semver.valid(item) !== null)
        .pop() || "unknown";
    const name = input
            .replace(version, "")
            .trim();
    return {
        name,
        version,
    };
}

export function getBrowserFrom(userAgent: string | undefined): IBrowser {
    if (userAgent === undefined) {
        return {
            ...unknownBrowser,
        };
    }

    const parts = userAgent.split("/");
    if (parts.length === 0) {
        // tslint:disable-next-line:no-console
        console.warn(`testcafe-reporter-cucumber-json: cannot get the Browser name from input string '${userAgent}'`);
        return {
            ...unknownBrowser,
        };
    }
    const rawBrowser = parts[0];
    if (rawBrowser === undefined) {
        // tslint:disable-next-line:no-console
        console.warn(`testcafe-reporter-cucumber-json: cannot get the Browser name from input string '${userAgent}'`);
        return {
            ...unknownBrowser,
        };
    }

    const browserInfo = extractNameAndVersion(rawBrowser);
    return {
        name: browserInfo.name.toLowerCase(),
        version: browserInfo.version,
    };
}
