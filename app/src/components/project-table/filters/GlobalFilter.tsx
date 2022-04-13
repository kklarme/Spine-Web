import { Row, useAsyncDebounce } from 'react-table';
import { Project } from 'spine-api';
import { FC, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

export interface GlobalFilterProps {
  preFilteredRows: Row<Project>[];
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
}

const GlobalFilter: FC<GlobalFilterProps> = ({ preFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex items-center border px-2 py-1 rounded-md max-w-md">
      <SearchIcon className="w-5 h-5" />
      <input
        autoFocus={true}
        className="ml-1 focus:outline-none"
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

export default GlobalFilter;
