import {GameType, Language, ModType, Project, SPINE_LANGUAGE_MAP} from 'spine-api';
import { createElement, FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { capitalizeWord, capitalizeWords, detectScrollbarHeight } from '../../utilities';
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
import EnumTypeFilter from './filters/EnumTypeFilter';
import { LANGUAGE_COUNTRY_FLAG_MAP } from '../../constants';

export type ProjectCellProps<V = any> = CellProps<Project, V> & { t: TFunction };

export interface ProjectTableProps {
  projects: Project[];
}

const DEFAULT_ASSUMED_TOP_BAR_HEIGHT = 300;

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

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - DEFAULT_ASSUMED_TOP_BAR_HEIGHT);

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

  const onToggleFilter = () => {
    requestAnimationFrame(updateMaxHeight);
  };

  return (
    <div ref={containerRef} className="flex flex-col min-h-0 h-full flex-grow">
      <div ref={topBarRef} className="flex flex-col p-4">
        <div className="flex justify-between">
          <GlobalFilter
            preFilteredRows={rows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <hr className="mt-3" />
        <div className="mt-3 flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4">
          <EnumTypeFilter
            className="flex-grow"
            isNumberEnum={true}
            enum={GameType}
            columnId={'gameType'}
            columns={{ 'default': 2, 'md': 4, 'lg': 2, '2xl': 3 }}
            header={capitalizeWords(t('project.game'))}
            filter={state.filters.find((filter) => filter.id === 'gameType')?.value}
            setFilter={setFilter}
            onToggle={onToggleFilter}
          />
          <EnumTypeFilter
            className="flex-grow"
            isNumberEnum={true}
            enum={ModType}
            columnId={'modType'}
            columns={{ 'default': 2, 'md': 4, 'lg': 2, 'xl': 3, '2xl': 4 }}
            header={capitalizeWords(t('project.type'))}
            filter={state.filters.find((filter) => filter.id === 'modType')?.value}
            setFilter={setFilter}
            onToggle={onToggleFilter}
          />
          <EnumTypeFilter
            className=""
            isNumberEnum={false}
            enum={Language}
            columnId={'supportedLanguages'}
            columns={{ default: 2, md: 4, lg: 1, xl: 2 }}
            header={capitalizeWords(t('project.languages'))}
            label={(props) => {
              const flagComponent = createElement(
                LANGUAGE_COUNTRY_FLAG_MAP[props.value as Language],
                {
                  className: 'inline-flex w-6 h-auto shadow',
                },
              );
              return (
                <div className="flex items-center">
                  {flagComponent}
                  <span className="ml-1 text-gray-600">{t(`language.${props.value}`)}</span>
                </div>
              );
            }}
            translationKey={'language'}
            filter={state.filters.find((filter) => filter.id === 'supportedLanguages')?.value}
            sortFilterValue={(a: Language, b: Language) => {
              return SPINE_LANGUAGE_MAP[a] - SPINE_LANGUAGE_MAP[b];
            }}
            setFilter={setFilter}
            onToggle={onToggleFilter}
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
