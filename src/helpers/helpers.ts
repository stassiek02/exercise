type Filter<T> = (item: T) => boolean;
export const combineFilters = <T>(...filters: Filter<T>[]): Filter<T> => {
  return (value: T) => {
    return filters.every((filter) => filter(value));
  };
};
export const getAverage = (args: number[]): number => {
  return args.reduce((acc, curr) => acc + curr, 0) / args.length;
};
export const removeExtremeValues = (items: number[]): number[] => {
  return [...items].sort((a, b) => a - b).slice(1, -1);
};
