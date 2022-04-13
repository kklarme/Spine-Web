import { FC, FormEvent } from 'react';
import { GameType, Project } from 'spine-api';
import { useTranslation } from 'react-i18next';
import { UseFiltersInstanceProps } from 'react-table';

export interface GameTypeFilterProps {
  filter?: GameType[];
  setFilter: UseFiltersInstanceProps<Project>['setFilter'];
}

export const GameTypeFilter: FC<GameTypeFilterProps> = (props) => {
  const { t } = useTranslation();
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    props.setFilter('gameType', (gameTypes?: GameType[]) => {
      gameTypes = gameTypes?.slice() || [];
      const input = e.target as HTMLInputElement;
      const gameType = parseInt(input.value) as GameType;
      if (!input.checked) {
        gameTypes = gameTypes.filter((type) => type !== gameType);
      } else {
        gameTypes.push(gameType);
      }
      return gameTypes.length === 0 ? undefined : gameTypes;
    });
  };
  return (
    <div className="flex flex-col border">
      <span className="self-center font-medium">Type</span>
      <div className="flex items-center space-x-3">
        {Object.values(GameType)
          .filter((gameType) => typeof gameType === 'number')
          .map((gameType) => {
            const id = `gameType_${gameType}_input`;
            return (
              <span
                key={gameType}
                className="flex items-center space-x-1"
                title={t(`gameType.${gameType}`)}
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={props.filter?.includes(gameType as GameType) ?? false}
                  value={gameType}
                  onChange={onChange}
                />
                <label htmlFor={id}>{t(`gameType.${gameType}`)}</label>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default GameTypeFilter;
