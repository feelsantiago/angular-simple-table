import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'app-table-expandable-row',
})
export class TableExpandableRowDirective {
  @Input()
  public expanded: boolean = false;
}
