import { getPlatformFrom, getBrowserFrom, getDeviceFrom } from './user-agent-parser';

test('It should get Windows platform', () => {
  // Given
  const userAgent = 'Chrome 75.0.3770 / Windows 10.0.0';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('windows');
});

test('It should get Windows platform on Browserstack', () => {
  // Given
  const userAgent =
    'Chrome 75.0.3770 / Windows 10.0.0 (https://automate.browserstack.com/builds/1f90795f6e1078f0dca1b94929a8d372c60970d5/sessions/98a8e7718381c14a5c6c64afe26babb7063cf7d3)';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('windows');
  expect(result.version).toBe('10.0.0');
});

test('It should get iOS 10.3.1 platform on Browserstack', () => {
  // Given
  const userAgent =
    'Safari 10.0 / iOS 10.3.1 (https://automate.browserstack.com/builds/7f1806192a8a516a750bfc912d5cbfb29bdb5417/sessions/15c6840f3a3f34b18779c40b65074bf5476ccbf5)';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('ios');
  expect(result.version).toBe('10.3.1');
});

test('It should get iOS 13.3 platform on Browserstack', () => {
  // Given
  const userAgent =
    'Safari 13.0.4 / iOS 13.3 (https://automate.browserstack.com/builds/7f1806192a8a516a750bfc912d5cbfb29bdb5417/sessions/747fdbcc4b4287207805c3ea7a35027c4461e213)';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('ios');
  expect(result.version).toBe('13.3');
});

test('It should get OSX platform', () => {
  // Given
  const userAgent = 'Chrome 80.0.3987.132 / macOS 10.15.3';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('osx');
  expect(result.version).toBe('10.15.3');
});

test('It should get Linux platform', () => {
  // Given
  const userAgent = 'Chrome 80.0.3987.132 / Linux 0.0';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('linux');
  expect(result.version).toBe('0.0');
});

test('It should get Ubuntu platform', () => {
  // Given
  const userAgent = 'Chrome 80.0.3987.132 / Ubuntu 20.04';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('ubuntu');
  expect(result.version).toBe('20.04');
});

test('It should get Windows platform on Windows 10', () => {
  // Given
  const userAgent = 'Chrome 80.0.3987.149 / Windows 10';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('windows');
  expect(result.version).toBe('10');
});

test('It should get browser from Chrome 80.0.3987.149', () => {
  // Given
  const userAgent = 'Chrome 80.0.3987.149 / Windows 10';

  // When
  const result = getBrowserFrom(userAgent);

  // Then
  expect(result.name).toBe('chrome');
  expect(result.version).toBe('80.0.3987.149');
});

test('It should get browser from Microsoft Edge 83.0.478.58 / macOS 10.15.5', () => {
  // Given
  const userAgent = 'Microsoft Edge 83.0.478.58 / macOS 10.15.5';

  // When
  const result = getBrowserFrom(userAgent);

  // Then
  expect(result.name).toBe('edge');
  expect(result.version).toBe('83.0.478.58');
});

test('It should get Android 10 platform', () => {
  // Given
  const userAgent = 'Chrome 83.0.4103.106 / Android 10';

  // When
  const result = getPlatformFrom(userAgent);

  // Then
  expect(result.name).toBe('android');
  expect(result.version).toBe('10');
});

test('It should get macOS device on browserstack', () => {
  // Given
  const userAgent =
    'Firefox 58.0 / macOS 10.13 (https://automate.browserstack.com/builds/0a16cdee255e6b5d2a62b8de836aa502cbed08c7/sessions/33495d985b83a6ad3ce2da6d6a67830ee8f078ad)';

  // When
  const result = getDeviceFrom(userAgent);

  // Then
  expect(result).toBe('macOS');
});

test('It should get macOS device', () => {
  // Given
  const userAgent = 'Firefox 58.0 / macOS 10.13';

  // When
  const result = getDeviceFrom(userAgent);

  // Then
  expect(result).toBe('macOS');
});

test('It should get IE browser on browserstack', () => {
  // Given
  const userAgent =
    'Internet Explorer 11.0 / Windows 10 (https://automate.browserstack.com/builds/0a16cdee255e6b5d2a62b8de836aa502cbed08c7/sessions/f2ad118f39459fb8d80a906e1ba945626d20dad0)';

  // When
  const result = getBrowserFrom(userAgent);

  // Then
  expect(result.name).toBe('Internet Explorer');
  expect(result.version).toBe('11.0');
});
