import { TableElementKey } from './types';

export type SelectionState<T> = TableElementKey<T>[] | 'all' | 'none';

export class TableSelectionState<T> {
  constructor(private readonly selection: SelectionState<T>) {}

  static merge<T>(
    current: TableElementKey<T>[],
    selecteds: SelectionState<T>
  ): TableSelectionState<T> {
    if (selecteds === 'all' || selecteds === 'none') {
      return new TableSelectionState(selecteds);
    }

    const difference = current
      .filter((key) => !selecteds.includes(key))
      .concat(selecteds.filter((key) => !current.includes(key)));

    return new TableSelectionState(difference);
  }

  selected(key: TableElementKey<T>): boolean {
    if (this.selection === 'all') {
      return true;
    }

    if (this.selection === 'none') {
      return false;
    }

    return this.selection.includes(key);
  }

  public selecteds(): TableElementKey<T>[] {
    if (this.selection === 'all' || this.selection === 'none') {
      return [];
    }

    return this.selection;
  }
}
