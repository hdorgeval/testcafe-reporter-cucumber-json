import { unlinkSync } from 'fs';
import 'jest';
import { join } from 'path';
import { tagsFromPhrase } from './tags-parser';

afterEach(() => {
  unlinkSync(join(process.cwd(), 'testcafe-reporter-cucumber-json.json'));
});

test('It should ignore words with less than 3 characters', () => {
  // Given
  const description = 'it should ignore yo and it but not foo and bar';

  // When
  const result = tagsFromPhrase(description).map((tag) => tag.name);

  // Then
  expect(result.includes('yo')).toBe(false);
});
