import { formatDownloadSize, Project } from 'spine-api';
import { FC, useCallback, useMemo } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { capitalizeWord } from '../utilities';
import {
  Column,
  SortByFn,
  SortingRule,
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { FixedSizeList } from 'react-window';
import LanguagesView from './LanguagesView';

export interface ProjectTableProps {
  projects: Project[];
}

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

const ProjectTable: FC<ProjectTableProps> = (props) => {
  const { t, i18n } = useTranslation();

  const tc = (...args: Parameters<TFunction>) => {
    const tResult = t(...args);
    return capitalizeWord(tResult);
  };

  const emptyValue = useMemo(() => '-', []);

  const scrollBarSize = useMemo(() => detectScrollbarWidth(), []);

  // provide a default cell component that automatically truncates the value and provides additional props like align
  const DefaultCell = useMemo(
    () => (props: any) => {
      return (
        <p className={`truncate ${props.align ? `text-${props.align}` : ''}`} title={props.value}>
          {props.value}
        </p>
      );
    },
    [],
  );

  const sortLanguages = useMemo<SortByFn<Project>>(
    () => (rowA, rowB, columnId, desc) => {
      const aLength = rowA.original.supportedLanguages.length;
      const bLength = rowB.original.supportedLanguages.length;
      return aLength - bLength;
    },
    [],
  );

  const columns = useMemo<Column<Project>[]>(
    () => [
      {
        Header: tc('project.id'),
        accessor: 'id',
        width: 44,
        sortType: 'number',
      },
      {
        Header: tc('project.name'),
        accessor: 'name',
        minWidth: 250,
        Cell: (props) => {
          return <DefaultCell {...props} align="left" />;
        },
        sortType: 'string',
      },
      {
        Header: tc('project.author'),
        accessor: 'teamName',
        minWidth: 200,
        Cell: (props) => {
          return <DefaultCell {...props} align="left" />;
        },
        sortType: 'string',
      },
      {
        Header: tc('project.type'),
        accessor: 'modType',
        Cell: (props) => {
          return <DefaultCell {...props} value={t(`modType.${props.value}`)} />;
        },
        sortType: 'number',
      },
      {
        Header: tc('project.game'),
        accessor: 'gameType',
        Cell: (props) => {
          return <DefaultCell {...props} value={t(`gameType.${props.value}`)} />;
        },
        sortType: 'number',
      },
      {
        Header: tc('project.developerPlaytime'),
        accessor: 'devDuration',
        Cell: (props) => {
          let duration = props.value;
          let durationUnitTranslationKey = 'minute';
          if (duration >= 60) {
            duration = Math.ceil(duration / 60);
            durationUnitTranslationKey = 'hour';
          }
          const value =
            duration > 0
              ? `${duration} ${t(`time.${durationUnitTranslationKey}`, { count: duration })}`
              : emptyValue;
          return <DefaultCell {...props} value={value} />;
        },
        width: 144,
        sortType: 'number',
      },
      {
        Header: tc('project.releaseDate'),
        accessor: 'releaseDate',
        Cell: (props) => {
          return <DefaultCell {...props} value={props.value.toLocaleDateString()} />;
        },
        sortType: 'datetime',
      },
      {
        Header: tc('project.updateDate'),
        accessor: 'updateDate',
        Cell: (props) => {
          return <DefaultCell {...props} value={props.value.toLocaleDateString()} />;
        },
        sortType: 'datetime',
      },
      {
        Header: tc('project.languages'),
        accessor: 'supportedLanguages',
        Cell: (props) => {
          return <LanguagesView languages={props.value} />;
        },
        sortType: sortLanguages,
      },
      {
        Header: tc('project.downloadSize'),
        accessor: 'downloadSize',
        Cell: (props) => {
          return <DefaultCell {...props} value={formatDownloadSize(props.value)} />;
        },
        width: 128,
        sortType: 'number',
      },
      {
        Header: tc('actions'),
        Cell: (props: any) => {
          return (
            <button
              className="hidden md:block"
              onClick={() => {
                window.open(`spine://start/${props.row.original.id}`, '_blank');
              }}
            >
              {t('start')}
            </button>
          );
        },
        disableResizing: true,
        disableSortBy: true,
      },
    ],
    [i18n.language],
  );

  const data = useMemo(
    () =>
      props.projects.map((project) => ({
        ...project,
        // make sure teamName always has a value
        teamName: project.teamName || emptyValue,
        // handle case if dates are strings due to being serialized by server
        releaseDate: new Date(project.releaseDate),
        updateDate: new Date(project.updateDate),
      })),
    [props.projects, i18n.language],
  );

  const initialSortBy = useMemo<SortingRule<Project>[]>(() => {
    return [
      {
        id: 'updateDate',
        desc: true,
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        minWidth: 44,
        maxWidth: 600,
        Cell: DefaultCell,
      },
      initialState: {
        sortBy: initialSortBy,
      },
    },
    useResizeColumns,
    useFlexLayout,
    useSortBy,
  );

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows],
  );

  return (
    <div className="block max-w-full">
      <div className="block max-w-full overflow-x-scroll overflow-y-hidden border border-black">
        <div {...getTableProps()} className="project-table table">
          <div className="thead">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column, index) => (
                  <div {...column.getHeaderProps()} className="th">
                    <div {...column.getSortByToggleProps()} className="w-full">
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </div>
                    {!(column as any).disableResizing && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                      />
                    )}
                  </div>
                ))}
                <div
                  className="border-b border-black"
                  style={{
                    width: scrollBarSize,
                    content: ' ',
                  }}
                />
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()} className="tbody">
            <FixedSizeList
              height={window.innerHeight - 200}
              itemCount={rows.length}
              itemSize={32}
              width={'100%'}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
