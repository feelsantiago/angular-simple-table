export type TableElementKey<T extends Object> = keyof T | number;

export type TableElement<T> = {
  key: keyof T | number;
  data: T;
  selected: boolean;
};

export function isDatakey<T extends Object>(
  data: T,
  key?: TableElementKey<T>
): key is keyof T {
  if (!key) {
    return false;
  }

  return key in data;
}
