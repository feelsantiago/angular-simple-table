import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableExpandableContent]',
})
export class TableExpandableContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
