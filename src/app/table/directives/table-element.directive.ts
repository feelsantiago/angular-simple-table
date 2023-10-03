import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableElement]',
})
export class TableElementDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
