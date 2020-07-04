import {
  existsSync,
  mkdirSync,
  PathLike,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { extname, join, sep } from 'path';

const isDirectory = (path: PathLike) => statSync(path).isDirectory();
const ignoreNodeModule = (path: string) => path.indexOf('node_modules') < 0;
const ignoreDotDir = (path: string) => path.startsWith('.') === false;
const ignoreBuildDir = (path: string) => path.startsWith('build') === false;
const getDirectoriesIn = (path: PathLike): string[] => {
  return readdirSync(path)
    .map((name) => join(path.toString(), name))
    .filter(isDirectory)
    .filter(ignoreNodeModule)
    .filter(ignoreDotDir)
    .filter(ignoreBuildDir);
};
const isFile = (path: PathLike) => statSync(path).isFile();

const defaultFileFilter = () => true;

const getFilesInDirectory = (path: PathLike, fileFilter?: (path: string) => boolean) =>
  readdirSync(path)
    .map((name) => join(path.toString(), name))
    .filter(isFile)
    .filter(fileFilter || defaultFileFilter);

const getDirectoriesRecursivelyIn = (path: string): string[] => {
  const subDirs = getDirectoriesIn(path);
  const result: string[] = [...subDirs];
  subDirs.map((dir) => {
    result.push(...getDirectoriesRecursivelyIn(dir));
  });

  return result;
};

export const getFilesRecursivelyIn = (
  directoryPath: string,
  fileFilter?: (path: string) => boolean,
): string[] => {
  const dirs = [directoryPath];
  getDirectoriesRecursivelyIn(directoryPath).map((dir) => dirs.push(dir));

  const files = dirs
    .map((dir) => getFilesInDirectory(dir, fileFilter))
    .reduce((a, b) => a.concat(b), []);
  return files;
};

export const writeJsonFileSync = (data: unknown, ...paths: string[]): void => {
  const json = JSON.stringify(data, null, 2);
  const filePath = join(...paths);
  ensureDirectoryStructureExists(filePath);
  writeFileSync(filePath, json);
};

export const writeReportSync = (data: string, ...paths: string[]): void => {
  const filePath = join(...paths);
  ensureDirectoryStructureExists(filePath);
  writeFileSync(filePath, data);
};

export const readAllLines = (filePath: string): string[] => {
  const lines = readFileSync(filePath, 'utf8').split('\n');
  return lines;
};

export const getParentDirs = (filePath: string): string[] => {
  const paths = filePath.split(sep).filter((dir) => dir !== '.');

  const dirs = paths.splice(0, paths.length - 1);
  return dirs;
};

export const getFilename = (filePath: string): string | undefined => {
  const filename = filePath.split(sep).pop();
  return filename;
};

const ensureDirectoryStructureExists = (filePath: string) => {
  const dirs = getParentDirs(filePath);
  let partialPath = '.';
  dirs.map((dir) => {
    partialPath = [partialPath, dir].join(sep);
    ensureDirectoryExists(partialPath);
  });
};

const ensureDirectoryExists = (directoryPath: string) => {
  if (existsSync(directoryPath)) {
    return;
  }
  mkdirSync(directoryPath);
};

export const jsonFrom = (filePath: string): unknown => {
  if (!isFile(filePath)) {
    return {};
  }
  return JSON.parse(readFileSync(filePath, 'utf8'));
};

export const fileExists = (filePath: string): boolean => {
  if (existsSync(filePath) && isFile(filePath)) {
    return true;
  }

  if (existsSync(filePath) && isDirectory(filePath)) {
    throw new Error(`File '${filePath}' is a directory but should be a file.`);
  }

  return false;
};

export const fileExtension = (filePath: string): string => {
  const extension = extname(filePath);
  return extension.startsWith('.') ? extension.replace('.', '') : extension;
};

export const toBase64DataImageUrl = (path: string): string => {
  const imageType = fileExtension(path);
  const base64Data = readFileSync(path).toString('base64');
  const dataUrl = `data:image/${imageType};base64,${base64Data}`;
  return dataUrl;
};

export const userAgentToFilename = (userAgent: string): string => {
  const filename = userAgent
    .replace(/[\s./:\\]/g, '_')
    .replace(/___/g, '_')
    .replace(/__/g, '_')
    .trim();
  return filename;
};

export const dateToFilename = (date: Date): string => {
  const filename = date.toISOString().replace(/\./g, '-').replace(/:/g, '-').trim();
  return filename;
};
