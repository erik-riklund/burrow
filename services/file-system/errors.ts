export class FileNotFoundError extends Error
{
  constructor (filePath: string)
  {
    super(`File does not exist: ${ filePath }`);

    this.name = 'FileNotFoundError';
  }
}

export class FolderNotFoundError extends Error
{
  constructor (folderPath: string)
  {
    super(`Folder does not exist: ${ folderPath }`);

    this.name = 'FolderNotFoundError';
  }
}