import { TableElement, TableElementKey } from './types';

export class DataTransform<T extends Object> {
  constructor(private readonly data: T[]) {}

  public elements(key?: TableElementKey<T>): TableElement<T>[] {
    return this.data.map((element, index) => ({
      key: key || index,
      data: element,
      selected: false,
    }));
  }
}
