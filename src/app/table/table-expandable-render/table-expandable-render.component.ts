import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-expandable-render',
  templateUrl: './table-expandable-render.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExpandableRenderComponent {
  @Input()
  public expanded = false;
}
