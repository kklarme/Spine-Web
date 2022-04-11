import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import DefaultCell from './DefaultCell';

const DateCell: FC<ProjectCellProps<Date>> = memo(function DateCell(props) {
  return <DefaultCell {...props} value={props.value.toLocaleDateString()} />;
});

export default DateCell;
