import { formatDownloadSize, Project } from 'spine-api';
import { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { capitalizeWord, capitalizeWords, detectScrollbarHeight } from '../utilities';
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
import Link from 'next/link';
import ProjectTableHeader from './ProjectTableHeader';
import { SearchIcon } from '@heroicons/react/outline';

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
    <div className="inline-flex items-center my-4">
      <SearchIcon className="w-6 h-6 -ml-0.5" />
      <input
        className="ml-1"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </div>
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

  const scrollBarHeight = useMemo(() => detectScrollbarHeight(), []);

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
        <p
          className={`truncate ${props.align ? `text-${props.align}` : ''}`}
          title={props.value.toString()}
        >
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
        Cell: (props) => {
          return (
            <Link
              href={{
                pathname: '/project/[id]',
                query: { id: props.value },
              }}
            >
              <a className={`truncate`} title={props.value.toString()}>
                {props.value}
              </a>
            </Link>
          );
        },
        minWidth: 100,
        width: 100,
        maxWidth: 140,
        sortType: 'number',
      },
      {
        Header: tc('project.name'),
        accessor: 'name',
        Cell: (props) => {
          return (
            <Link
              href={{
                pathname: '/project/[id]',
                query: { id: props.row.original.id },
              }}
            >
              <a className={`truncate text-black font-medium`} title={props.value}>
                {props.value}
              </a>
            </Link>
          );
        },
        minWidth: 300,
        width: 420,
        maxWidth: 700,
        sortType: 'string',
      },
      {
        Header: tc('project.author'),
        accessor: 'teamName',
        Cell: (props) => {
          return <DefaultCell {...props} align="left" />;
        },
        minWidth: 160,
        width: 220,
        maxWidth: 400,
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
        sortType: 'number',
      },
      {
        Header: ' ',
        Cell: (props: any) => {
          return (
            <button
              className="hidden md:block text-accent hover:text-accent-dark"
              onClick={() => {
                window.open(`spine://start/${props.row.original.id}`, '_blank');
              }}
            >
              {capitalizeWord(t('start'))}
            </button>
          );
        },
        width: 100,
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
        maxWidth: 300,
        width: 200,
        minWidth: 100,
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

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 200);

  useLayoutEffect(() => {
    const updateMaxHeight = () => {
      if (tableRef.current && theadRef.current) {
        setMaxHeight(
          tableRef.current.offsetHeight - theadRef.current.offsetHeight - scrollBarHeight - 3,
        );
      }
    };

    updateMaxHeight();

    window.addEventListener('resize', updateMaxHeight);
    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);
  const itemSize = 40;
  const height = Math.min(maxHeight, itemSize * rows.length);

  return (
    <div className="flex flex-col min-h-0 h-full flex-grow">
      <div className="px-8">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div ref={tableRef} className="flex-grow">
        <div className="overflow-x-scroll overflow-y-hidden scrollbar">
          <div {...getTableProps()} className="project-table table">
            <ProjectTableHeader headerGroups={headerGroups} ref={theadRef} />

            <div {...getTableBodyProps()} className="tbody">
              <FixedSizeList
                height={height}
                itemCount={rows.length}
                itemSize={itemSize}
                width={'100%'}
                className="virtual-list scrollbar"
                style={{ overflowY: 'scroll' }}
              >
                {RenderRow}
              </FixedSizeList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
