export type ExpandableRow = number | 'all' | 'none';

export class ExpandableState {
  constructor(public row: ExpandableRow) {}

  static init(): ExpandableState {
    return new ExpandableState('none');
  }

  expanded(row: ExpandableRow): boolean {
    if (this.row === 'all') {
      return true;
    }

    return row === this.row;
  }

  expand(row: ExpandableRow): ExpandableState {
    if (this.expanded(row)) {
      return new ExpandableState('none');
    }

    return new ExpandableState(row);
  }
}
