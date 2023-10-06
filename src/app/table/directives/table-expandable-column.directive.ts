import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableExpandableIcon]',
})
export class TableExpandableColumnDirective {
  constructor(public template: TemplateRef<unknown>) {}

  @Input()
  public title?: string;
}
