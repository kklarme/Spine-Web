import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import DefaultCell from './DefaultCell';
import { ModType } from 'spine-api';

const ModTypeCell: FC<ProjectCellProps<ModType>> = memo(function ModTypeCell(props) {
  return <DefaultCell {...props} value={props.t(`modType.${props.value}`)} />;
});

export default ModTypeCell;
