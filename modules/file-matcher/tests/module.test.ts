import { it, expect } from 'bun:test'
import { createFileMatcher } from '..'

it('should match a single file when given an exact path',
  () =>
  {
    const filter = createFileMatcher('path/to/file.txt');
    const files = ['path/to/file.txt', 'path/to/another-file.txt', 'path/to/other/file.txt'];

    expect(filter(files)).toEqual(['path/to/file.txt']);
  }
);

it('should match multiple files when given a wildcard',
  () =>
  {
    const filter = createFileMatcher('path/to/*.txt');
    const files = ['path/to/file.txt', 'path/to/another-file.txt', 'path/to/other/file.txt'];

    expect(filter(files)).toEqual(['path/to/file.txt', 'path/to/another-file.txt']);
  }
);

it('should match a single file when given a glob folder path',
  () =>
  {
    const filter = createFileMatcher('path/**/file.txt');
    const files = ['path/to/file.txt', 'path/to/another-file.txt', 'path/to/other/file.txt'];

    expect(filter(files)).toEqual(['path/to/file.txt', 'path/to/other/file.txt']);
  }
);

it('should match all `.txt` files in the folder using a glob folder path and wildcard',
  () =>
  {
    const filter = createFileMatcher('path/**/*.txt');
    const files = ['path/to/file.txt', 'path/to/another-file.txt', 'path/to/other/file.txt'];

    expect(filter(files)).toEqual([
      'path/to/file.txt', 'path/to/another-file.txt', 'path/to/other/file.txt'
    ]);
  }
);

it('should match the files specified using brace expansions',
  () =>
  {
    const filter = createFileMatcher('path/to/{file1,file2}.txt');
    const files = ['path/to/file1.txt', 'path/to/file2.txt', 'path/to/file3.txt'];

    expect(filter(files)).toEqual(['path/to/file1.txt', 'path/to/file2.txt']);
  }
);