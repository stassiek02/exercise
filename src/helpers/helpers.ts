import { ICharacter } from '../types/character';

type Filter<T> = (item: T) => boolean;
export const combineFilters = <T>(...filters: Filter<T>[]): Filter<T> => {
  return (value: T) => {
    return filters.every((filter) => filter(value));
  };
};
export const getAverage = (args: ICharacter[]): number => {
  if (args.length === 0) {
    return 0;
  }
  return (
    args.reduce((acc, curr) => {
      return acc + curr.height;
    }, 0) / args.length
  );
};
export const removeExtremeValues = (items: number[]): number[] => {
  return [...items].sort((a, b) => a - b).slice(1, -1);
};
