/**
 * Takes an array of file paths and returns a new array
 * containing only the entries that match the provided pattern.
 * 
 * @param input An array of file paths.
 * @returns A new array containing only the entries that match the provided pattern.
 */
export type FileMatcher = (filePaths: string[]) => string[];