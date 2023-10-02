export type TableElementKey<T> = T[keyof T] | number;

export type TableElement<T> = {
  key: T[keyof T] | number;
  data: T;
  selected: boolean;
};
