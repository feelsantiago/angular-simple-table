import { ContentChild, Directive, Input } from '@angular/core';
import { TableElementDirective } from './table-element.directive';

@Directive({
  selector: 'app-table-column',
})
export class TableColumnDirective {
  @Input()
  public title!: string;

  @ContentChild(TableElementDirective)
  public content!: TableElementDirective;

  public get template() {
    return this.content.template;
  }
}
