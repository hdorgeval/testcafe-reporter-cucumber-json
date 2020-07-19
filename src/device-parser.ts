import { BrowserInfo } from './reporter-interface';
import { devices } from './devices';

export function getDeviceFromBrowserInfo(browserInfo: BrowserInfo): string | null {
  if (!browserInfo) {
    return null;
  }

  if (browserInfo && browserInfo.alias && browserInfo.alias.startsWith('browserstack')) {
    const aliasParts = browserInfo.alias.split(':');
    const browserstatckDevice = aliasParts.pop();
    if (browserstatckDevice && devices.includes(browserstatckDevice)) {
      return browserstatckDevice;
    }

    if (aliasParts.length >= 2 && browserstatckDevice) {
      return browserstatckDevice;
    }
  }

  return null;
}
