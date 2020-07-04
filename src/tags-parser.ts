import { Tag } from './cucumber-json-interfaces';
import { options } from './options';

export const tagsFromDescription = (description: string): Tag[] => {
  if (description === undefined) {
    return [];
  }

  const words = description
    .split(/\s|\n|\r|\.|:|!|,|;/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2)
    .map((w) => w.toLocaleLowerCase())
    .filter((w) => !isNoisyTag(w, options.noisyTags));

  return distinct(words).map((word) => ({ name: `@${word}`, line: 0 }));
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
