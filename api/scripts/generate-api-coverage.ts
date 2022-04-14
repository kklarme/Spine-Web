import { ComparedRoute, FileMeta, getComparedRoutes } from './api-coverage';
import { promises } from 'fs';

const prettier = require('prettier');
const prettierConfig = require('../../.prettierrc.js');

const markdownHeader = `# spine-api - API coverage`;
const columns = ['path', 'method', 'implemented', 'remote file', 'local file'];
const columnSeparator = '|';
const headerSeparatorValue = '---';
const lineBreak = '\n';
const isImplementedText = '✅';
const isMissingText = '❌';

function getFileName(file: FileMeta): string {
  const fileNameParts = file.path.split('/');
  return fileNameParts[fileNameParts.length - 1];
}

function getFilePath(file: FileMeta): string {
  return `${file.path}#L${file.lineNumber}`;
}

function getRowMarkdown(route: ComparedRoute): string {
  const fileLink = `[${getFileName(route.file)}](${getFilePath(route.file)})`;

  let localFileLink = '-';
  if (route.localFile) {
    localFileLink = `[${getFileName(route.localFile)}](../${getFilePath(route.localFile)})`;
  }

  const statusText = route.isImplemented ? isImplementedText : isMissingText;
  return (
    columnSeparator +
    [route.path, route.method, statusText, fileLink, localFileLink].join(columnSeparator) +
    columnSeparator
  );
}

(async () => {
  const comparedRoutes = await getComparedRoutes();
  comparedRoutes.sort((a, b) => {
    if (a.isImplemented && !b.isImplemented) {
      return -1;
    }
    if (!a.isImplemented && b.isImplemented) {
      return 1;
    }
    return 0;
  });

  const markdownTableHeader = columns.reduce(
    (tableHeader, column) => tableHeader + column + columnSeparator,
    columnSeparator,
  );
  const markdownTableHeaderSeparator = columns.reduce(
    (separator) => separator + headerSeparatorValue + columnSeparator,
    columnSeparator,
  );
  const markdownTableBody = comparedRoutes.reduce(
    (tableBody, route) => tableBody + getRowMarkdown(route) + lineBreak,
    '',
  );

  const markdown = [
    markdownHeader,
    markdownTableHeader,
    markdownTableHeaderSeparator,
    markdownTableBody,
  ].join(lineBreak);
  const formattedMarkdown = prettier.format(markdown, { ...prettierConfig, parser: 'markdown' });
  await promises.writeFile('docs/api-coverage.md', Buffer.from(formattedMarkdown));
})();
