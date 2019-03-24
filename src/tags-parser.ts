import { Tag } from './cucumber-json-interfaces';
import { options } from './options';

export const tagsFromDescription = (description: string): Tag[] => {
  const tags: Tag[] = [];
  if (description === undefined) {
    return tags;
  }
  let words: string[] = [description];
  options.separators.map((separator: string) => {
    const splittedWords: string[] = [];
    words.map((word) => {
      word
        .split(separator)
        .map((w) => w.trim())
        .filter((w) => w.length > 2)
        .filter((w) => !isNoisyTag(w, options.noisyTags))
        .map((w) => w.toLocaleLowerCase())
        .map((w) => splittedWords.push(w));
    });
    words = [...splittedWords];
  });

  distinct(words)
    .map((word) => ({ name: `@${word}`, line: 0 }))
    .map((tag) => tags.push(tag));
  return tags;
};
export const isNoisyTag = (tag: string, unwantedTags: string[]): boolean => {
  if (unwantedTags && unwantedTags.length === 0) {
    return false;
  }
  const isNoisy =
    unwantedTags.filter(
      (noisyTag) => noisyTag.toLocaleLowerCase() === tag.toLocaleLowerCase(),
    ).length > 0;
  return isNoisy;
};
export const distinct = (items: string[]): string[] => {
  const hashset = new Set<string>([...items]);
  return Array.from(hashset.values());
};
