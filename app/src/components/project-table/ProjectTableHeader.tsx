import { createElement, forwardRef, useMemo } from 'react';
import { HeaderGroup } from 'react-table';
import { Project } from 'spine-api';
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid';

function detectScrollbarWidth(): number {
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;',
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export interface ProjectTableHeadProps {
  headerGroups: HeaderGroup<Project>[];
}

// eslint-disable-next-line react/display-name
const ProjectTableHeader = forwardRef<HTMLDivElement, ProjectTableHeadProps>((props, ref) => {
  const scrollbarWidth = useMemo(() => detectScrollbarWidth(), []);

  return (
    <div ref={ref} className="thead bg-gray-100 border-t border-b border-b-gray-300 shadow-sm">
      {props.headerGroups.map((headerGroup) => (
        // eslint-disable-next-line react/jsx-key
        <div {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <div
              {...column.getHeaderProps()}
              className="th border-r h-12"
              title={column.Header as string}
            >
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
