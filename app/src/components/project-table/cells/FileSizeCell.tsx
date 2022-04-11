import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import DefaultCell from './DefaultCell';
import { formatDownloadSize } from 'spine-api';

const FileSizeCell: FC<ProjectCellProps<number>> = memo(function FileSizeCell(props) {
  return <DefaultCell {...props} value={formatDownloadSize(props.value)} />;
});

export default FileSizeCell;
