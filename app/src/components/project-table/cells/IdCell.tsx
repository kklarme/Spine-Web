import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import LinkCell from './LinkCell';

const IdCell: FC<ProjectCellProps<number>> = memo(function IdCell(props) {
  return (
    <LinkCell
      {...props}
      href={{
        pathname: '/project/[id]',
        query: { id: props.value },
      }}
    />
  );
});

export default IdCell;
