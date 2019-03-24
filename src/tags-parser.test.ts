import { unlinkSync } from 'fs';
import 'jest';
import { join } from 'path';
import { tagsFromDescription } from './tags-parser';

afterAll(() => {
  unlinkSync(join(process.cwd(), 'testcafe-reporter-cucumber-json.json'));
});

test('It should ignore words with less than 3 characters', () => {
  // Given
  const description = 'it should ignore yo and it but not foo and bar';

  // When
  const result = tagsFromDescription(description).map((tag) => tag.name);

  // Then
  expect(result.includes('yo')).toBe(false);
  expect(result.includes('it')).toBe(false);
  expect(result.includes('@foo')).toBe(true);
  expect(result.includes('@bar')).toBe(true);
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
