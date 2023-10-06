import {
  ContentChild,
  ContentChildren,
  Directive,
  QueryList,
} from '@angular/core';
import { BehaviorSubject, Observable, scan, shareReplay } from 'rxjs';
import { ExpandableRow, ExpandableState } from '../domain/expandable-state';
import { TableColumnDirective } from './table-column.directive';
import { TableExpandableContentDirective } from './table-expandable-content.directive';

@Directive({
  selector: 'app-table-expandable-row',
})
export class TableExpandableRowDirective {
  @ContentChildren(TableColumnDirective)
  public columns!: QueryList<TableColumnDirective>;

  @ContentChild(TableExpandableContentDirective)
  public content!: TableExpandableContentDirective;

  public get template() {
    return this.content.template;
  }

  public expanded$!: Observable<ExpandableState>;

  private readonly expandedCommand$ = new BehaviorSubject<ExpandableRow>(
    'none'
  );

  constructor() {
    this.expanded$ = this.expandedCommand$.pipe(
      scan((state, row) => state.expand(row), ExpandableState.init()),
      shareReplay(1)
    );
  }

  public expand(row: number): void {
    this.expandedCommand$.next(row);
  }
}
