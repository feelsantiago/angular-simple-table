import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TableCheckboxColumnDirective } from './directives/table-checkbox-column.directive';
import { TableColumnDirective } from './directives/table-column.directive';
import { TableExpandableContentDirective } from './directives/table-expandable-content.directive';
import { TableExpandableIconDirective } from './directives/table-expandable-icon.directive';
import { TableExpandableRowDirective } from './directives/table-expandable-row.directive';

export type TableElementKey<T> = T[keyof T] | number;

type TableElement<T> = {
  key: TableElementKey<T>;
  data: T;
  selected: boolean;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Object> {
  @Input()
  public data!: T[];

  @Input()
  public selectBy?: keyof T;

  @Input()
  public set selectedKeys(keys: TableElementKey<T>[]) {
    this.selectAllByKey(keys, true);
  }

  @Output()
  public selectedKeysChange = new EventEmitter<TableElementKey<T>[]>();

  @ContentChildren(TableColumnDirective)
  public _columns!: QueryList<TableColumnDirective>;

  @ContentChild(TableCheckboxColumnDirective)
  public checkbox?: TableCheckboxColumnDirective;

  @ContentChild(TableExpandableRowDirective)
  public expandable?: TableExpandableRowDirective;

  public get columns() {
    return this.expandable?.columns ?? this._columns;
  }

  public selecteds: Map<TableElementKey<T>, boolean> = new Map();
  public expandedRow?: number;

  public selected(element: T, index: number): boolean {
    const founded = this.selecteds.get(this.key(element, index));
    return founded ?? false;
  }

  public onElementSelected(element: T, index: number): void {
    if (this.selected(element, index)) {
      this.selecteds.delete(this.key(element, index));
      this.selectedKeysChange.emit([...this.selecteds.keys()]);
      return;
    }

    this.selecteds.set(this.key(element, index), true);
    this.selectedKeysChange.emit([...this.selecteds.keys()]);
  }

  public onSelectAll(event: Event): void {
    const checked = (<HTMLInputElement>event.target).checked;

    this.selecteds.clear();
    this.selectAll(this.data, checked);

    const selecteds = checked ? [...this.selecteds.keys()] : [];
    this.selectedKeysChange.emit(selecteds);
  }

  public onExpandRow(row: number): void {
    if (this.expandedRow == row) {
      this.expandedRow = undefined;
      return;
    }

    this.expandedRow = row;
  }

  private key(element: T, index: number): TableElementKey<T> {
    return this.selectBy ? element[this.selectBy] : index;
  }

  private selectAll(elements: T[], selection: boolean): void {
    for (let [index, element] of elements.entries()) {
      this.selecteds.set(this.key(element, index), selection);
    }
  }

  private selectAllByKey(keys: TableElementKey<T>[], selection: boolean): void {
    for (let key of keys) {
      this.selecteds.set(key, selection);
    }
  }
}
