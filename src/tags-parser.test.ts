import { unlinkSync } from 'fs';
import 'jest';
import { join } from 'path';
import { tagsFromDescription } from './tags-parser';

afterAll(() => {
  unlinkSync(join(process.cwd(), 'testcafe-reporter-cucumber-json.json'));
});

test("It should prefix tags with the '@' character", () => {
  // Given
  const description = 'it should ignore yo and it but not foo and bar';

  // When
  const result = tagsFromDescription(description).map((tag) => tag.name);

  // Then
  expect(result.includes('@foo')).toBe(true);
  expect(result.includes('@bar')).toBe(true);
});

test('It should ignore words with less than 3 characters', () => {
  // Given
  const description = 'it should ignore yo and it but not foo and bar';

  // When
  const result = tagsFromDescription(description).map((tag) => tag.name);

  // Then
  expect(result.includes('@yo')).toBe(false);
  expect(result.includes('@it')).toBe(false);
  expect(result.includes('@foo')).toBe(true);
  expect(result.includes('@bar')).toBe(true);
});

test('It should ignore noisy tags', () => {
  // Given
  const description = 'scenario: it should ignore yo and it but not foo and bar';

  // When
  const result = tagsFromDescription(description).map((tag) => tag.name);

  // Then
  expect(result.includes('@scenario')).toBe(false);
  expect(result.includes('@but')).toBe(false);
  expect(result.includes('@not')).toBe(false);
  expect(result.includes('@should')).toBe(false);
  expect(result.includes('@and')).toBe(false);
});

test('It should take only distinct tags', () => {
  // Given
  const description =
    'scenario: it should ignore yo but it should not ignore foo and bar';

  // When
  const result = tagsFromDescription(description)
    .map((tag) => tag.name)
    .filter((word) => word === '@ignore').length;

  // Then
  expect(result).toBe(1);
});

test('It should split with separators /s|\n|\r|.|:|!|,|;/', () => {
  // Given
  const description = 'foo bar.foobar:fizz!buzz,yep;nope';

  // When
  const result = tagsFromDescription(description).map((tag) => tag.name);

  // Then
  expect(result.includes('@foo')).toBe(true);
  expect(result.includes('@bar')).toBe(true);
  expect(result.includes('@foobar')).toBe(true);
  expect(result.includes('@fizz')).toBe(true);
  expect(result.includes('@buzz')).toBe(true);
  expect(result.includes('@yep')).toBe(true);
  expect(result.includes('@nope')).toBe(true);
  expect(result.length).toBe(7);
});
