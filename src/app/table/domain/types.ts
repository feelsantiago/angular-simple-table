export type TableElementKey<T> = T[keyof T] | number;

export type TableElement<T> = {
  key: TableElementKey<T>;
  data: T;
  selected: boolean;
};
