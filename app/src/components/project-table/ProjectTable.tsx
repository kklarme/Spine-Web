import { Project } from 'spine-api';
import { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { capitalizeWord, detectScrollbarHeight } from '../../utilities';
import {
  CellProps,
  Column,
  Filters,
  FilterType,
  FilterTypes,
  SortByFn,
  SortingRule,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { FixedSizeList } from 'react-window';
import ProjectTableHeader from './ProjectTableHeader';
import GlobalFilter from './filters/GlobalFilter';
import DefaultCell from './cells/DefaultCell';
import PlaytimeCell from './cells/PlaytimeCell';
import DateCell from './cells/DateCell';
import FileSizeCell from './cells/FileSizeCell';
import LanguagesCell from './cells/LanguagesCell';
import ActionsCell from './cells/ActionsCell';
import IdCell from './cells/IdCell';
import NameCell from './cells/NameCell';
import ModTypeCell from './cells/ModTypeCell';
import GameTypeCell from './cells/GameTypeCell';
import LanguageFilter from './filters/LanguageFilter';
import ModTypeFilter from './filters/ModTypeFilter';
import GameTypeFilter from './filters/GameTypeFilter';

export type ProjectCellProps<V = any> = CellProps<Project, V> & { t: TFunction };

export interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: FC<ProjectTableProps> = (props) => {
  const { t, i18n } = useTranslation();
  const theadRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  const tc = (...args: Parameters<TFunction>) => {
    const tResult = t(...args);
    return capitalizeWord(tResult);
  };

  const emptyValue = useMemo(() => '-', []);

  const scrollBarHeight = useMemo(() => detectScrollbarHeight(), []);

  const filterTypes = useMemo<FilterTypes<Project>>(() => ({}), []);

  const sortLanguages = useMemo<SortByFn<Project>>(
    () => (rowA, rowB, columnId, desc) => {
      const aLength = rowA.original.supportedLanguages.length;
      const bLength = rowB.original.supportedLanguages.length;
      return aLength - bLength;
    },
    [],
  );

  const arrayFilter = useMemo<FilterType<Project>>(
    () => (rows, columnIds, filterValue) => {
      const columnId = columnIds[0] as keyof Project;
      filterValue = !Array.isArray(filterValue) ? [] : filterValue;
      return rows.filter((row) => filterValue.includes(row.original[columnId]));
    },
    [],
  );

  const columns = useMemo<Column<Project>[]>(
    () => [
      {
        Header: tc('project.id'),
        accessor: 'id',
        Cell: IdCell,
        minWidth: 100,
        width: 100,
        maxWidth: 140,
        sortType: 'number',
      },
      {
        Header: tc('project.name'),
        accessor: 'name',
        Cell: NameCell,
        minWidth: 300,
        width: 420,
        maxWidth: 700,
        sortType: 'string',
      },
      {
        Header: tc('project.author'),
        accessor: 'teamName',
        minWidth: 160,
        width: 220,
        maxWidth: 400,
        sortType: 'string',
      },
      {
        Header: tc('project.type'),
        accessor: 'modType',
        Cell: ModTypeCell,
        sortType: 'number',
        filter: arrayFilter,
      },
      {
        Header: tc('project.game'),
        accessor: 'gameType',
        Cell: GameTypeCell,
        sortType: 'number',
        filter: arrayFilter,
      },
      {
        Header: tc('project.avgPlaytime'),
        accessor: 'avgDuration',
        Cell: PlaytimeCell,
        sortType: 'number',
      },
      {
        Header: tc('project.devPlaytime'),
        accessor: 'devDuration',
        Cell: PlaytimeCell,
        sortType: 'number',
      },
      {
        Header: tc('project.releaseDate'),
        accessor: 'releaseDate',
        Cell: DateCell,
        sortType: 'datetime',
      },
      {
        Header: tc('project.updateDate'),
        accessor: 'updateDate',
        Cell: DateCell,
        sortType: 'datetime',
      },
      {
        Header: tc('project.version'),
        accessor: 'version',
        minWidth: 100,
        width: 140,
        maxWidth: 180,
      },
      {
        Header: tc('project.languages'),
        accessor: 'supportedLanguages',
        Cell: LanguagesCell,
        sortType: sortLanguages,
        filter: 'text',
      },
      {
        Header: tc('project.downloadSize'),
        accessor: 'downloadSize',
        Cell: FileSizeCell,
        sortType: 'number',
      },
      {
        Header: ' ',
        Cell: ActionsCell,
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

  const initialFilters = useMemo<Filters<Project>>(() => [], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
  } = useTable<Project>(
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
        filters: initialFilters,
      },
    },
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
    useFilters,
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
          className="tr group border-b hover:bg-accent-light hover:text-white"
        >
          {row.cells.map((cell) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div {...cell.getCellProps()} className="td border-r px-8">
                {cell.render('Cell', { t })}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows],
  );

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 200);

  const updateMaxHeight = useMemo(
    () => () => {
      if (theadRef.current && containerRef.current && topBarRef.current) {
        setMaxHeight(
          containerRef.current.offsetHeight -
            theadRef.current.offsetHeight -
            topBarRef.current.offsetHeight -
            scrollBarHeight,
        );
      }
    },
    [],
  );

  useLayoutEffect(() => {
    updateMaxHeight();

    window.addEventListener('resize', updateMaxHeight);
    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);
  const itemSize = useMemo(() => 40, []);
  const height = Math.min(maxHeight, itemSize * rows.length);

  return (
    <div ref={containerRef} className="flex flex-col min-h-0 h-full flex-grow">
      <div ref={topBarRef} className="flex items-center justify-between px-8">
        <GlobalFilter
          preFilteredRows={rows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="flex">
          <GameTypeFilter
            filter={state.filters.find((filter) => filter.id === 'gameType')?.value}
            setFilter={setFilter}
          />
          <ModTypeFilter
            filter={state.filters.find((filter) => filter.id === 'modType')?.value}
            setFilter={setFilter}
          />
          <LanguageFilter
            filter={state.filters.find((filter) => filter.id === 'supportedLanguages')?.value}
            setFilter={setFilter}
          />
        </div>
      </div>
      <div className="flex-grow flex-shrink">
        <div className="overflow-x-scroll overflow-y-hidden">
          <div {...getTableProps()} className="project-table table">
            <ProjectTableHeader headerGroups={headerGroups} ref={theadRef} />

            <div {...getTableBodyProps()} className="tbody">
              <FixedSizeList
                height={height}
                itemCount={rows.length}
                itemSize={itemSize}
                width={'100%'}
                className="virtual-list"
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
