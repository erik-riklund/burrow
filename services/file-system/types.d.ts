export interface FileSystemHandler
{
  /**
   * Creates a new file handler for the specified path,
   * returning an object with methods for interacting with the file.
   */
  file (path: string): FileHandler;

  /**
   * Creates a new folder handler for the specified path,
   * returning an object with methods for interacting with the folder.
   */
  folder (path: string): FolderHandler;
}


export interface FileHandler
{
  /**
   * Returns `true` if the file exists, `false` otherwise.
   */
  get exists (): boolean;

  /**
   * Returns the folder path for the file.
   */
  get folder (): string;

  /**
   * Returns the last modified time of the file in milliseconds
   * since the Unix epoch, or `-1` if the file does not exist.
   */
  get lastModified (): number;

  /**
   * Returns the name of the file, including the extension.
   */
  get name (): string;

  /**
   * Returns the full path to the file.
   */
  get path (): string;

  /**
   * ?
   */
  delete (): void;

  /**
   * Reads the contents of the file and returns it as a string.
   *
   * @param encoding - The encoding of the file.
   */
  read (encoding?: BufferEncoding): string;

  /**
   * Reads the contents of the file and returns it as a JSON object of type `T`.
   *
   * @param encoding - The encoding of the file (defaults to `utf8`).
   */
  readJson<T> (encoding?: BufferEncoding): T;

  /**
   * Writes the provided data (a string) to the file.
   *
   * @param encoding - The encoding of the file (defaults to `utf8`).
   */
  write (data: string, encoding?: BufferEncoding): void;

  /**
   * Writes the provided JSON data to the file.
   *
   * @param encoding - The encoding of the file (defaults to `utf8`).
   */
  writeJson<T extends JsonValue> (data: T, encoding?: BufferEncoding): void;
}


export interface FolderHandler
{
  /**
   * Returns `true` if the folder exists, `false` otherwise.
   */
  get exists (): boolean;

  /**
   * Returns the path to the folder.
   */
  get path (): string;

  /**
   * Clear the contents of the folder, leaving the directory itself.
   */
  clear (): void;

  /**
   * Creates the folder if it does not exist.
   *
   * @returns A boolean indicating whether the folder was created successfully.
   */
  create (): boolean;

  /**
   * Delete the folder and its contents.
   */
  delete (): void;

  /**
   * Creates and returns a new file handler object for the specified path (relative to the folder).
   */
  file (path: string): FileHandler;

  /**
   * Creates and returns a new folder handler for the specified path (relative to the folder).
   */
  folder (path: string): FolderHandler;

  /**
   * Reads the contents of the folder and returns an array of file names
   * that match the specified glob pattern.
   */
  match (pattern: string): string[];

  /**
   * Reads the contents of the folder and returns an array of file names.
   */
  read (options?: { recursive: boolean; }): string[];

  /**
   * ?
   */
  watch (pattern: string, callback: (event: string, filePath: string) => void): void;
}


/**
 * Represents a select subset of the `node:fs` module's API.
 */
export type FileSystem = Pick<typeof import('node:fs'),
  'existsSync' | 'mkdirSync' | 'readFileSync' | 'readdirSync' | 'rmSync' | 'statSync' | 'writeFileSync'
>;