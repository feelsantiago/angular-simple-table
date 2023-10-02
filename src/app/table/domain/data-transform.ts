import { TableSelectionState } from './table-selection-state';
import { TableElement } from './types';

export class DataTransform<T extends Object> {
  constructor(
    private readonly data: T[],
    private readonly selecteds: TableSelectionState<T>
  ) {}

  public elements(select?: keyof T): TableElement<T>[] {
    return this.data.map((element, index) => {
      const key = select ? element[select] : index;
      return {
        key: key,
        data: element,
        selected: this.selecteds.selected(select ? key : index),
      };
    });
  }
}
