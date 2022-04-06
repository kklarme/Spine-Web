import { createElement, forwardRef, useMemo } from 'react';
import { HeaderGroup } from 'react-table';
import { Project } from 'spine-api';
import { detectScrollbarWidth } from '../utilities';
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';

export interface ProjectTableHeadProps {
  headerGroups: HeaderGroup<Project>[];
}

// eslint-disable-next-line react/display-name
const ProjectTableHeader = forwardRef<HTMLDivElement, ProjectTableHeadProps>((props, ref) => {
  const scrollbarWidth = useMemo(() => detectScrollbarWidth(), []);

  return (
    <div ref={ref} className="thead bg-gray-50 border-t border-b border-b-gray-300">
      {props.headerGroups.map((headerGroup) => (
        <div {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map((column) => (
            <div {...column.getHeaderProps()} className="th h-12" title={column.Header as string}>
              <div
                {...column.getSortByToggleProps()}
                title={undefined}
                className="w-full font-bold flex items-center px-8 h-full truncate"
              >
                {column.render('Header')}
                {createElement(column.isSortedDesc ? SortDescendingIcon : SortAscendingIcon, {
                  className: `flex-shrink-0 h-5 w-5 mt-1 ml-1.5 ${
                    column.isSorted ? '' : 'invisible'
                  }`,
                })}
              </div>
              {!column.disableResizing && (
                <div
                  {...column.getResizerProps()}
                  className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                />
              )}
            </div>
          ))}
          <div
            style={{
              width: scrollbarWidth,
              content: ' ',
            }}
          />
        </div>
      ))}
    </div>
  );
});

export default ProjectTableHeader;
