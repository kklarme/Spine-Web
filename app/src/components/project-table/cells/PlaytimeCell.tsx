import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import DefaultCell from './DefaultCell';

const PlaytimeCell: FC<ProjectCellProps<number>> = memo(function PlaytimeCell(props) {
  let duration = props.value;
  let durationUnitTranslationKey = 'minute';
  if (duration >= 60) {
    duration = Math.ceil(duration / 60);
    durationUnitTranslationKey = 'hour';
  }
  const value =
    duration > 0
      ? `${duration} ${props.t(`time.${durationUnitTranslationKey}`, { count: duration })}`
      : '-';
  return <DefaultCell {...props} value={value} />;
});

export default PlaytimeCell;
