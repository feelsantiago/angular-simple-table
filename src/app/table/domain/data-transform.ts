import { TableElement, TableElementKey } from './types';

export class DataTransform<T extends Object> {
  constructor(
    private readonly data: T[],
    private readonly selecteds: TableElementKey<T>[] = []
  ) {}

  public elements(select?: keyof T): TableElement<T>[] {
    return this.data.map((element, index) => {
      const key = select ? element[select] : index;
      return {
        key: key,
        data: element,
        selected: this.selecteds.includes(select ? key : index),
      };
    });
  }
}
