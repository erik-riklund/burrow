import { useFileSystemHandler } from '..';
import { fs as memfs, vol, type DirectoryJSON } from 'memfs';
import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { FileNotFoundError, FolderNotFoundError } from '../errors';

// const files: DirectoryJSON =
//   {
//     '/simple.txt': 'Hello world',
//     '/sub/test.json': '{"key":"value"}',
//     '/sub/child/test.txt': 'Hello world',
//     '/sub/child/test2.json': '{"key2":"value2"}',
//     '/another/folder/path/test3.txt': 'Hello world 3'
//   };

// beforeEach(() => vol.fromJSON(files));
// afterEach(() => vol.reset());

// // type mismatch between `node:fs` and `memfs`.
// const fs = memfs as unknown as typeof import('node:fs');


// describe('file handler', () =>
//   {
//     it('should check if a file exists', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);

//         expect(fileSystem.file('/simple.txt').exists).toBe(true);
//         expect(fileSystem.file('/nonexistent.txt').exists).toBe(false);
//       }
//     );

//     it('should return the file name', () =>
//       {
//         const fileHandler = useFileSystemHandler(fs).file('/sub/test.json');

//         expect(fileHandler.name).toBe('test.json');
//       }
//     )

//     it('should read the file contents', () =>
//       {
//         const fileHandler = useFileSystemHandler(fs).file('/simple.txt');

//         expect(fileHandler.read()).toBe('Hello world');
//       }
//     );

//     it('should read the file contents as JSON', () =>
//       {
//         const expected = { key: 'value' };
//         const fileHandler = useFileSystemHandler(fs).file('/sub/test.json');

//         expect(fileHandler.readJson<typeof expected>()).toEqual({ key: 'value' });
//       }
//     );

//     it('should throw an error if the file does not exist', () =>
//       {
//         const fileHandler = useFileSystemHandler(fs).file('/nonexistent.txt');

//         expect(() => fileHandler.read()).toThrow(FileNotFoundError);
//       }
//     );

//     it('should write the provided data to a file', () =>
//       {
//         const fileHandler = useFileSystemHandler(fs).file('/simple.txt');

//         const data = 'Goodbye cruel world...';
//         fileHandler.write(data);

//         expect(fileHandler.read()).toBe(data);
//       }
//     );

//     it('should write the provided JSON data to a file', () =>
//       {
//         const expected = { key: 'value' };
//         const fileHandler = useFileSystemHandler(fs).file('/sub/test.json');

//         fileHandler.writeJson(expected);
//         expect(fileHandler.readJson<typeof expected>()).toEqual(expected);
//       }
//     );

//     it('should return the last modified time of the file', () =>
//       {
//         const fileHandler = useFileSystemHandler(fs).file('/simple.txt');

//         expect(fileHandler.lastModified).toBeNumber();
//       }
//     );

//     it('should return `-1` if the file does not exist', () =>
//       {
//         const fileHandler = useFileSystemHandler(fs).file('nonexistent.txt');

//         expect(fileHandler.lastModified).toBe(-1);
//       }
//     );

//     it('should delete the file', ()=>
//       {
//         const fileSystem = useFileSystemHandler(fs);
//         const file = fileSystem.file('/simple.txt');

//         file.delete();

//         expect(file.exists).toBe(false);
//       }
//     );
//   }
// );

// describe('folder handler', () =>
//   {
//     it('should return the path to the folder', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);

//         expect(fileSystem.folder('/sub').path).toBe('/sub');
//         expect(fileSystem.folder('/sub/test').path).toBe('/sub/test');
//       }
//     );

//     it('should check if the folder exists', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);

//         expect(fileSystem.folder('/sub').exists).toBe(true);
//         expect(fileSystem.folder('/nonexistent').exists).toBe(false);
//       }
//     );

//     it('should create the new folder', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);
//         const folderPath = '/newFolder';

//         expect(fileSystem.folder(folderPath).create()).toBe(true);
//       }
//     );

//     it('it should read the contents of a folder', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);
//         const contents = fileSystem.folder('/sub').read();

//         expect(contents).toEqual([ 'test.json' ]);
//       }
//     );

//     it('should create a new file handler for the specified path', () =>
//       {
//         const folderHandler = useFileSystemHandler(fs).folder('/sub');
//         const fileHandler = folderHandler.file('test.txt');

//         expect(fileHandler.name).toBe('test.txt');
//       }
//     );

//     it('should delete the folder and its contents', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);
//         const folder = fileSystem.folder('/sub');

//         folder.delete()

//         expect(folder.exists).toBe(false);
//       }
//     );

//     it('should delete the contents but leave the folder', () =>
//       {
//         const fileSystem = useFileSystemHandler(fs);
//         const folder = fileSystem.folder('/sub');
//         const file = fileSystem.file('/sub/child/test.txt');

//         folder.clear();

//         expect(folder.exists).toBe(true);
//         expect(file.exists).toBe(false);
//       }
//     );
//   }
// );