import {
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  QueryList,
} from '@angular/core';
import { TableColumnDirective } from './table-column.directive';
import { TableExpandableContentDirective } from './table-expandable-content.directive';
import { TableExpandableIconDirective } from './table-expandable-icon.directive';

@Directive({
  selector: 'app-table-expandable-row',
})
export class TableExpandableRowDirective {
  @ContentChildren(TableColumnDirective)
  public columns!: QueryList<TableColumnDirective>;

  @ContentChild(TableExpandableContentDirective)
  public content!: TableExpandableContentDirective;

  @ContentChild(TableExpandableIconDirective)
  public icon?: TableExpandableIconDirective;

  public get template() {
    return this.content.template;
  }
}
