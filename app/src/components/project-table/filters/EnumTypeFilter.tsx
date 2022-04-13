import { ComponentType, createElement, FormEvent, useState } from 'react';
import { Project } from 'spine-api';
import { useTranslation } from 'react-i18next';
import { IdType, UseFiltersInstanceProps } from 'react-table';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

export interface LabelComponentProps<T extends string | number> {
  columnId: IdType<Project>;
  value: T;
}

export interface ColumnsOptions {
  'default'?: number;
  'sm'?: number;
  'md'?: number;
  'lg'?: number;
  'xl'?: number;
  '2xl'?: number;
}

export interface EnumTypeFilterProps<T extends string | number> {
  isNumberEnum: T extends number ? true : T extends string ? false : boolean;
  enum: object;
  columnId: IdType<Project>;
  header: string;
  filter: T[] | undefined;
  setFilter: UseFiltersInstanceProps<Project>['setFilter'];
  columns: number | ColumnsOptions;
  sortFilterValue?: (a: T, b: T) => number;
  className?: string;
  translationKey?: string;
  label?: ComponentType<LabelComponentProps<T>>;

  onToggle?: (isExpanded: boolean) => void;
}

export function EnumTypeFilter<T extends string | number>(props: EnumTypeFilterProps<T>) {
  const [isExpanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    props.setFilter(props.columnId, (filterValues?: T[]) => {
      filterValues = filterValues?.slice() || [];
      const input = e.target as HTMLInputElement;
      const value = (props.isNumberEnum ? parseInt(input.value) : input.value) as T;
      if (!input.checked) {
        filterValues = filterValues.filter((filterValue) => filterValue !== value);
      } else {
        filterValues.push(value);
        if (props.sortFilterValue) {
          filterValues.sort(props.sortFilterValue);
        }
      }
      return filterValues.length === 0 ? undefined : filterValues;
    });
  };

  const columnsToClassName = (columns: ColumnsOptions) => {
    return Object.entries(columns).reduce((className, [size, colCount]) => {
      className += size === 'default' ? `columns-${colCount} ` : `${size}:columns-${colCount} `;
      return className;
    }, '');
  };

  const columnsClassName =
    typeof props.columns === 'number'
      ? `columns-${props.columns}`
      : columnsToClassName(props.columns);

  console.log(props.columns, columnsClassName);

  return (
    <div className={`flex flex-col border bg-gray-50 rounded ${props.className || ''}`}>
      <div
        className={`flex items-center justify-center font-medium cursor-pointer py-1 px-2 bg-gray-100 lg:cursor-default lg:border-b ${
          isExpanded ? 'border-b' : ''
        }`}
        onClick={(e) => {
          e.preventDefault();
          setExpanded(!isExpanded);
          props.onToggle?.(isExpanded);
        }}
      >
        <span>{props.header}</span>
        {createElement(isExpanded ? ChevronUpIcon : ChevronDownIcon, {
          className: 'w-5 h-5 lg:hidden',
        })}
      </div>
      <div
        className={`py-1 px-4 flex-grow lg:block ${columnsClassName} ${isExpanded ? '' : 'hidden'}`}
      >
        {Object.values(props.enum)
          .filter((value) =>
            props.isNumberEnum ? typeof value === 'number' : typeof value === 'string',
          )
          .map((value) => {
            const id = `${props.columnId}_${value}_input`;
            return (
              <span
                key={value}
                className={`flex items-center space-x-1`}
                title={t(`${props.translationKey || props.columnId}.${value}`)}
              >
                <input
                  id={id}
                  type="checkbox"
                  className="rounded"
                  checked={props.filter?.includes(value as T) ?? false}
                  value={value}
                  onChange={onChange}
                />
                <label htmlFor={id} className="text-gray-600 truncate">
                  {props.label
                    ? createElement(props.label, {
                        columnId: props.columnId,
                        value,
                      })
                    : t(`${props.translationKey || props.columnId}.${value}`)}
                </label>
              </span>
            );
          })}
      </div>
    </div>
  );
}

export default EnumTypeFilter;
