import type { FileHandler } from './types'
import type { FileSystemHandler } from './types'
import type { FileSystem } from './types'
import type { FolderHandler } from './types'

import { createFileMatcher } from 'module:file-matcher'
import { FileNotFoundError, FolderNotFoundError } from './errors'

/**
 * Creates a new file system handler for the specified file system.
 *
 * @param fileSystem - The file system to use.
 * @returns An object representing the file system.
 */
export const useFileSystemHandler = (fileSystem: FileSystem) =>
{
  const instance: FileSystemHandler =
  {
    // ~
    file (path: string)
    {
      return useFileHandler(fileSystem, path);
    },

    // ~
    folder (path: string)
    {
      return useFolderHandler(fileSystem, path);
    },
  };

  return instance;
};

/**
 * Creates a new file handler for the specified path.
 *
 * @param fileSystem - The file system handler to use.
 * @param filePath - The path to the file.
 * @returns An object representing the file.
 */
export const useFileHandler = (fileSystem: FileSystem, filePath: string) =>
{
  const instance: FileHandler =
  {
    // ~
    get exists ()
    {
      if (!fileSystem.existsSync(filePath))
      {
        return false; // file does not exist.
      }

      const stats = fileSystem.statSync(filePath);
      return stats.isFile(); // file exists and is a file.
    },

    // ~
    get folder ()
    {
      return filePath.includes('/') ? filePath.slice(0, filePath.lastIndexOf('/')) : '.';
    },

    // ~
    get lastModified ()
    {
      if (!fileSystem.existsSync(filePath))
      {
        return -1; // file does not exist.
      }

      const stats = fileSystem.statSync(filePath);
      return stats.isFile() ? stats.mtimeMs : -1;
    },

    // ~
    get name ()
    {
      return filePath.split('/').pop() || '';
    },

    // ~
    get path ()
    {
      return filePath;
    },

    // ~
    delete ()
    {
      fileSystem.rmSync(filePath);
    },

    // ~
    read (encoding = 'utf8')
    {
      if (!this.exists)
      {
        throw new FileNotFoundError(filePath);
      }

      return fileSystem.readFileSync(filePath, encoding);
    },

    // ~
    readJson (encoding = 'utf8')
    {
      return JSON.parse(this.read(encoding));
    },

    // ~
    write (data, encoding = 'utf8')
    {
      fileSystem.writeFileSync(filePath, data, encoding);
    },

    // ~
    writeJson (data, encoding = 'utf8')
    {
      this.write(JSON.stringify(data, null, 2), encoding);
    }
  };

  return instance;
};

/**
 * ?
 */
export const useFolderHandler = (fileSystem: FileSystem, folderPath: string) =>
{
  const instance: FolderHandler =
  {
    // ~
    get exists ()
    {
      if (!fileSystem.existsSync(folderPath))
      {
        return false; // folder does not exist.
      }

      const stats = fileSystem.statSync(folderPath);
      return stats.isDirectory(); // folder exists and is a directory.
    },

    // ~
    get path ()
    {
      return folderPath;
    },

    // ~
    clear ()
    {
      this.delete();

      this.create(); // recreate the folder.
    },

    // ~
    create ()
    {
      if (this.exists)
      {
        return true; // folder already exists.
      }

      fileSystem.mkdirSync(folderPath, { recursive: true });
      return this.exists; // folder created successfully.
    },

    // ~
    delete ()
    {
      fileSystem.rmSync(folderPath, { force: true, recursive: true });
    },

    // ~
    file (path)
    {
      const filePath = `${ folderPath }/${ path }`
        .replace(/\\/g, '/').replace(/\/\//g, '/');

      return useFileHandler(fileSystem, filePath);
    },

    // ~
    folder (path)
    {
      const subfolderPath = `${ folderPath }/${ path }`
        .replace(/\\/g, '/').replace(/\/\//g, '/');

      return useFolderHandler(fileSystem, subfolderPath);
    },

    // ~
    match (pattern)
    {
      const filter = createFileMatcher(pattern);
      const recursive = pattern.includes('/');

      return filter(this.read({ recursive }));
    },

    // ~
    read (options = { recursive: false })
    {
      if (!this.exists)
      {
        throw new FolderNotFoundError(folderPath);
      }

      const fileList: string[] = [];
      const items = fileSystem.readdirSync(
        folderPath, { withFileTypes: true, ...options }
      );

      const rootFolderPath = folderPath.replace(/^\.*\//, '');

      for (const item of items)
      {
        if (item.isFile())
        {
          const normalizedPath = item.parentPath.replace(/\\/g, '/');

          if (!normalizedPath || normalizedPath === '/')
          {
            fileList.push(item.name);

            continue; // no parent folder.
          }

          const relativePath = normalizedPath.slice(rootFolderPath.length + 1);

          if (!relativePath)
          {
            fileList.push(item.name); // no parent folder.
          }
          else
          {
            fileList.push(`${ relativePath }/${ item.name }`);
          }
        }
      }

      return fileList;
    },

    // ~
    watch (pattern, callback)
    {
      // watch(`${folderPath}/${pattern}`).on('all', callback);
    }
  };

  return instance;
};