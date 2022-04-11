import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';

const DefaultCell: FC<ProjectCellProps> = memo(function DefaultCell(props) {
  return (
    <p className={`truncate`} title={props.value.toString()}>
      {props.value}
    </p>
  );
});

export default DefaultCell;
