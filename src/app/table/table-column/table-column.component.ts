import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table-column',
  template: `
    <ng-template #column>
      <p>{{ title }}</p>
    </ng-template>
  `,
})
export class TableColumnComponent {
  @Input()
  public title!: string;

  @ViewChild('column', { static: true }) template!: TemplateRef<unknown>;
}
