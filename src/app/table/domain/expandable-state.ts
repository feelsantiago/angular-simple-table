export type ExpandableRow = number | 'all' | 'none';

export class ExpandableState {
  constructor(public readonly enabled: boolean, public row: ExpandableRow) {}

  static init(): ExpandableState {
    return new ExpandableState(true, 'none');
  }

  expanded(row: ExpandableRow): boolean {
    if (this.enabled && this.row === 'all') {
      return true;
    }

    return this.enabled && row === this.row;
  }

  expand(row: ExpandableRow): ExpandableState {
    if (this.expanded(row)) {
      return new ExpandableState(this.enabled, 'none');
    }

    return new ExpandableState(this.enabled, row);
  }
}