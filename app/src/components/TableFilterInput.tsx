import { Row, useAsyncDebounce } from 'react-table';
import { Project } from 'spine-api';
import { FC, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

export interface TableFilterInputProps {
  preFilteredRows: Row<Project>[];
  filter: string;
  setFilter: (filter: string) => void;
}

const TableFilterInput: FC<TableFilterInputProps> = ({ preFilteredRows, filter, setFilter }) => {
  const count = preFilteredRows.length;
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);

  return (
    <div className="inline-flex items-center my-2">
      <SearchIcon className="w-5 h-5 -ml-0.5" />
      <input
        autoFocus={true}
        className="ml-1.5 focus:outline-none"
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

export default TableFilterInput;
