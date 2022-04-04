import { formatDownloadSize, Project } from 'spine-api';
import { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { capitalizeWord, detectScrollbarWidth } from '../utilities';
import {
  Column,
  FilterTypes,
  Row,
  SortByFn,
  SortingRule,
  useAsyncDebounce,
  useFlexLayout,
  useGlobalFilter,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { FixedSizeList } from 'react-window';
import LanguagesView from './LanguagesView';
import { matchSorter } from 'match-sorter';

export interface ProjectTableProps {
  projects: Project[];
}

export interface GlobalFilterProps {
  preGlobalFilteredRows: Row<Project>[];
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
}

const GlobalFilter: FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
};

function fuzzyTextFilterFn(rows: Row<Project>[], ids: string[], filterValue: string) {
  // { keys: [row => row.values[id]] }
  return matchSorter(rows, filterValue);
}

fuzzyTextFilterFn.autoRemove = (val: unknown) => !val;

const ProjectTable: FC<ProjectTableProps> = (props) => {
  const { t, i18n } = useTranslation();
  const theadRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const tc = (...args: Parameters<TFunction>) => {
    const tResult = t(...args);
    return capitalizeWord(tResult);
  };

  const emptyValue = useMemo(() => '-', []);

  const scrollBarSize = useMemo(() => detectScrollbarWidth(), []);

  const filterTypes = useMemo<FilterTypes<Project>>(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    [],
  );

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        minWidth: 44,
        maxWidth: 600,
        Cell: DefaultCell,
      },
      filterTypes,

      initialState: {
        sortBy: initialSortBy,
      },
    },
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
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

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 500);

  useLayoutEffect(() => {
    const updateMaxHeight = () => {
      if (tableRef.current && theadRef.current) {
        setMaxHeight(tableRef.current.clientHeight - theadRef.current.clientHeight);
      }
    };

    updateMaxHeight();

    window.addEventListener('resize', updateMaxHeight);
    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);
  const itemSize = 32;
  const height = Math.min(maxHeight, itemSize * rows.length);

  return (
    <div className="h-full overflow-x-scroll overflow-y-hidden border border-black">
      <div {...getTableProps()} ref={tableRef} className="project-table h-full table">
        <div className="thead" ref={theadRef}>
          <div className="border-b border-black">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
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
            height={height}
            itemCount={rows.length}
            itemSize={itemSize}
            width={'100%'}
            style={{ overflowY: 'scroll' }}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
