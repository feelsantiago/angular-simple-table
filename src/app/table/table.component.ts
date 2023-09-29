import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TableElementDirective } from './directives/table-element.directive';
import { TableColumnComponent } from './table-column/table-column.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {
  @Input()
  public data!: T[];

  @ContentChildren(TableElementDirective, {
    descendants: true,
  })
  contents!: QueryList<TableElementDirective>;

  @ContentChildren(TableColumnComponent)
  columns!: QueryList<TableColumnComponent>;
}
