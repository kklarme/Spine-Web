import { getComparedRoutes } from './api-coverage';
import { promises } from 'fs';
const prettier = require('prettier');
const prettierConfig = require('../../.prettierrc.js');

const markdownHeader = `# spine-api - API coverage`;
const columns = ['path', 'method', 'implemented', 'file'];
const columnSeparator = '|';
const headerSeparatorValue = '---';
const lineBreak = '\n';
const isImplementedText = '✅';
const isMissingText = '❌';

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

  const markdownTableHeader = columns.reduce((tableHeader, column) => {
    return tableHeader + column + columnSeparator;
  }, columnSeparator);
  const markdownTableHeaderSeparator = columns.reduce((separator, column) => {
    return separator + headerSeparatorValue + columnSeparator;
  }, columnSeparator);

  const markdownTableBody = comparedRoutes.reduce((tableBody, route) => {
    const fileNameParts = route.file.split('/');
    const fileName = fileNameParts[fileNameParts.length - 1];
    const fileLink = `[${fileName}](${route.file})`;
    const statusText = route.isImplemented ? isImplementedText : isMissingText;
    const row =
      columnSeparator +
      [route.path, route.method, statusText, fileLink].join(columnSeparator) +
      columnSeparator;
    return tableBody + row + lineBreak;
  }, '');

  const markdown = [
    markdownHeader,
    markdownTableHeader,
    markdownTableHeaderSeparator,
    markdownTableBody,
  ].join(lineBreak);
  const formattedMarkdown = prettier.format(markdown, { ...prettierConfig, parser: 'markdown' });
  await promises.writeFile('docs/api-coverage.md', Buffer.from(formattedMarkdown));
})();
