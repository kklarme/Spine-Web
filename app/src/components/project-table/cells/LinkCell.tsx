import { FC, memo } from 'react';
import { ProjectCellProps } from '../ProjectTable';
import Link, { LinkProps } from 'next/link';

export interface LinkCellProps extends ProjectCellProps {
  href: LinkProps['href'];
  className?: string;
}

const LinkCell: FC<LinkCellProps> = memo(function LinkCell(props) {
  return (
    <Link href={props.href}>
      <a className={`truncate ${props.className || ''}`} title={props.value.toString()}>
        {props.value}
      </a>
    </Link>
  );
});

export default LinkCell;
