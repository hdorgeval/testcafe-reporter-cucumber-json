import { BrowserInfo } from './reporter-interface';
import { getDeviceFromBrowserInfo } from './device-parser';

test('It should get Xiaomi Redmi Note 8 on Browserstack', () => {
  // Given
  const browser: BrowserInfo = {
    testRunId: 'ucwCHsMDn',
    name: 'Chrome',
    version: '83.0.4103.106',
    platform: 'mobile',
    os: {},
    engine: {},
    prettyUserAgent: 'Chrome 83.0.4103.106 / Android 9',
    userAgent:
      'Mozilla/5.0 (Linux; Android 9; Redmi Note 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
    alias: 'browserstack:Xiaomi Redmi Note 8',
    headless: false,
  };

  // When
  const result = getDeviceFromBrowserInfo(browser);

  // Then
  expect(result).toBe('Xiaomi Redmi Note 8');
});
