import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import DefaultCell from './DefaultCell';
import { GameType } from 'spine-api';

const GameTypeCell: FC<ProjectCellProps<GameType>> = memo(function GameTypeCell(props) {
  return <DefaultCell {...props} value={props.t(`gameType.${props.value}`)} />;
});

export default GameTypeCell;
