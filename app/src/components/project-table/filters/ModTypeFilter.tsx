import { FC, FormEvent } from 'react';
import { ModType, Project } from 'spine-api';
import { useTranslation } from 'react-i18next';
import { UseFiltersInstanceProps } from 'react-table';

export interface ModTypeFilterProps {
  filter?: ModType[];
  setFilter: UseFiltersInstanceProps<Project>['setFilter'];
}

export const ModTypeFilter: FC<ModTypeFilterProps> = (props) => {
  const { t } = useTranslation();
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    props.setFilter('modType', (modTypes?: ModType[]) => {
      modTypes = modTypes?.slice() || [];
      const input = e.target as HTMLInputElement;
      const modType = parseInt(input.value) as ModType;
      if (!input.checked) {
        modTypes = modTypes.filter((type) => type !== modType);
      } else {
        modTypes.push(modType);
      }
      return modTypes.length === 0 ? undefined : modTypes;
    });
  };
  return (
    <div className="flex flex-col border">
      <span className="self-center font-medium">Type</span>
      <div className="flex items-center space-x-3">
        {Object.values(ModType)
          .filter((modType) => typeof modType === 'number')
          .map((modType) => {
            const id = `modType_${modType}_input`;
            return (
              <span
                key={modType}
                className="flex items-center space-x-1"
                title={t(`modType.${modType}`)}
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={props.filter?.includes(modType as ModType) ?? false}
                  value={modType}
                  onChange={onChange}
                />
                <label htmlFor={id}>{t(`modType.${modType}`)}</label>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default ModTypeFilter;
