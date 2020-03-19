import { getPlatformFrom } from './user-agent-parser';

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
