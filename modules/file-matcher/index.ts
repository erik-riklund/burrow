import type { FileMatcher } from './types'

/**
 * Creates a function that filters an array of file paths based on
 * the provided pattern, returning only the entries that match.
 *
 * @returns A function that takes an array of file paths and returns a new array
 *          containing only the entries that match the provided pattern.
 */
export const createFileMatcher = (pattern: string): FileMatcher =>
{
  const compiledPattern = compilePattern(pattern);

  return (filePaths: string[]) =>
    filePaths.filter((path) => compiledPattern.test(path));
};

// PURPOSE:
// Compile a pattern into a regular expression.
// 
// This function takes a glob pattern (a string) and returns a regular expression
// that can be used to match file paths against the pattern.
// 
// The regular expression is created as follows:
//
// 1. All occurrences of '.' and '/' are escaped with '\'.
// 2. Replace '**/' with '([^/]+\/)*', which matches any number of subdirectories.
// 3. Replace '*' without a preceding ')' with '[^/]+', which matches any non-slash character.
// 4. Replace '{group}' with '(group)', where 'group' is a comma-separated list of values.
// 
const compilePattern = (pattern: string) =>
{
  const escapedPattern = pattern.replace(/[./]/g, '\\$&');

  const compiledPattern = escapedPattern
    .replace(/\*{2}\\\//, '([^/]+\/)*')
    .replace(/(?<![)])\*/, '[^/]+')
    .replace(/\{([^}]+)}/g, (_, group) =>
      `(${ group.split(',').map((item: string) => item.trim()).join('|') })`
    );

  return new RegExp(`^${ compiledPattern }$`);
};