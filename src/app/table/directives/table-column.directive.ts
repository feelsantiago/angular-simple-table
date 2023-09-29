import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'app-table-column',
})
export class TableColumnDirective {
  @Input()
  public title!: string;
}
