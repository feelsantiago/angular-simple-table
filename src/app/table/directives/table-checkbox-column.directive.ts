import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'app-table-checkbox-column',
})
export class TableCheckboxColumnDirective {
  @Input()
  public showSelectAll: boolean = true;
}
