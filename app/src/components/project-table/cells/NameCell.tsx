import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import LinkCell from './LinkCell';

const NameCell: FC<ProjectCellProps<string>> = memo(function NameCell(props) {
  return (
      <LinkCell
          {...props}
          href={{
              pathname: '/project/[id]',
              query: { id: props.row.original.id },
          }}
          className="font-medium"
      />
  );
});

export default NameCell;
