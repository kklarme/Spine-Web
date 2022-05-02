import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import { capitalizeWord } from '../../../utilities';

const ActionsCell: FC<ProjectCellProps> = memo(function ActionsCell(props) {
  return (
    <button
      className="hidden md:block text-accent-light hover:text-accent-dark group-hover:text-white"
      onClick={() => {
        window.open(`spine://start/${props.row.original.id}`, '_blank');
      }}
    >
      {capitalizeWord(props.t('start'))}
    </button>
  );
});

export default ActionsCell;
