import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableExpandableIcon]',
})
export class TableExpandableIconDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
