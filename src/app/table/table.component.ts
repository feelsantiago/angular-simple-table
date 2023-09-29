import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { TableCheckboxColumnDirective } from './directives/table-checkbox-column.directive';
import { TableColumnDirective } from './directives/table-column.directive';
import { TableElementDirective } from './directives/table-element.directive';

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

  @ContentChildren(TableElementDirective, {
    descendants: true,
  })
  contents!: QueryList<TableElementDirective>;

  @ContentChildren(TableColumnDirective)
  columns!: QueryList<TableColumnDirective>;

  @ContentChild(TableCheckboxColumnDirective)
  checkbox?: TableCheckboxColumnDirective;

  public selecteds: Map<T[keyof T] | number, boolean> = new Map();

  public selected(element: T, index: number): boolean {
    const founded = this.selecteds.get(this.key(element, index));
    return founded ?? false;
  }

  public onElementSelected(element: T, index: number): void {
    if (this.selected(element, index)) {
      this.selecteds.delete(this.key(element, index));
      return;
    }

    this.selecteds.set(this.key(element, index), true);
  }

  public onSelectAll(event: Event): void {
    const checked = (<HTMLInputElement>event.target).checked;
    this.selecteds.clear();

    for (let [index, element] of this.data.entries()) {
      this.selecteds.set(this.key(element, index), checked);
    }
  }

  private key(element: T, index: number): T[keyof T] | number {
    return this.selectBy ? element[this.selectBy] : index;
  }
}
