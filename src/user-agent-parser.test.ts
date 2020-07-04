import { getPlatformFrom, getBrowserFrom } from './user-agent-parser';

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
